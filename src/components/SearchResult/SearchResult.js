import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import requests from "../../requests/requests";
import Nav from "../Nav/Nav";
import Row from "../Row/Row";
import ax from "../../requests/axios"
import axios from "axios";
import "./SearchResult.css"

function SearchResult() {
    const {query} = useParams();
    const [searchResultData, setSearchResultData] = useState([]);
    const [noResultFound, setNoResultFound] = useState([false]);
    const chunk = 20;
    useEffect(() => {
        const source = axios.CancelToken.source();

        async function fetchData() {
            await axios.all([
                ax.get(`${requests.fetchSearchResult}${query}&page=1`, {cancelToken: source.token}),
                ax.get(`${requests.fetchSearchResult}${query}&page=2`, {cancelToken: source.token}),
                ax.get(`${requests.fetchSearchResult}${query}&page=3`, {cancelToken: source.token}),
                ax.get(`${requests.fetchSearchResult}${query}&page=4`, {cancelToken: source.token}),
                ax.get(`${requests.fetchSearchResult}${query}&page=5`, {cancelToken: source.token}),
                ax.get(`${requests.fetchSearchResult}${query}&page=6`, {cancelToken: source.token}),
            ]).then(axios.spread(
                (request1, request2, request3, request4, request5, request6) => {
                    if (
                      request1.data.results?.length === 0 &&
                      request2.data.results?.length === 0 &&
                      request3.data.results?.length === 0 &&
                      request4.data.results?.length === 0 &&
                      request5.data.results?.length === 0 &&
                      request6.data.results?.length === 0
                    ) {
                      setNoResultFound(true);
                    } else {
                      //filtering results with no backdrop image
                      const data1 = request1.data.results.filter(
                        (item) => item?.backdrop_path
                      );
                      const data2 = request2.data.results.filter(
                        (item) => item?.backdrop_path
                      );
                      const data3 = request3.data.results.filter(
                        (item) => item?.backdrop_path
                      );
                      const data4 = request4.data.results.filter(
                        (item) => item?.backdrop_path
                      );
                      const data5 = request5.data.results.filter(
                        (item) => item?.backdrop_path
                      );
                      const data6 = request6.data.results.filter(
                        (item) => item?.backdrop_path
                      );
                        console.log(data1);
                      if (
                        data1?.length === 0 &&
                        data2?.length === 0 &&
                        data3?.length === 0 &&
                        data4?.length === 0 &&
                        data5?.length === 0 &&
                        data6?.length === 0
                      ) {
                        setNoResultFound(true);
                      } else {
                        setNoResultFound(false);
                        setSearchResultData([]);
                        const Data = [
                          ...data1,
                          ...data2,
                          ...data3,
                          ...data4,
                          ...data5,
                          ...data6,
                        ];
                        setSearchResultData(Data);
                      }
                    }
                }
            )).catch(() => {
                setNoResultFound(true);
            });
        }
        if (query?.length > 50) {
            setNoResultFound(true);
        } else {
            fetchData();
        }
        return () => {
            setNoResultFound(false);
            setSearchResultData([]);
            source.cancel();
        }
    }, [query]);

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };

    return (
        <>
          <Nav />
          {noResultFound ? (
            <div className="searchResult noResultFound">
              <div className="suggestions">
                <div>
                  Your search for
                  <span className="search__query">" {truncate(query, 40)} "</span>
                  did not have any matches.
                </div>
                <div>Suggestions:</div>
                <ul>
                  <li>Check the connection.</li>
                  <li>Try different keyword.</li>
                  <li>Looking for a movie or TV show?</li>
                  <li>Try using a movie, TV show title, an actor or director.</li>
                  <li>Try a genre like comedy, romance, sport or drama.</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="searchResult">
              <h2 style = {{marginLeft: 20}}>Search results for "{truncate(query, 40)}"</h2>
              {searchResultData && (
                <>
                  <Row isSearch SearchResult={searchResultData?.slice(0, chunk)} mediaType=""/>
                  <Row isSearch SearchResult={searchResultData?.slice(chunk, 2 * chunk)} mediaType=""/>
                  <Row isSearch SearchResult={searchResultData?.slice(2 * chunk, 3 * chunk)} mediaType=""/>
                  <Row isSearch SearchResult={searchResultData?.slice(3 * chunk, 4 * chunk)} mediaType=""/>
                  <Row isSearch SearchResult={searchResultData?.slice(4 * chunk, 5 * chunk)} mediaType=""/>
                  <Row isSearch SearchResult={searchResultData?.slice(5 * chunk)} mediaType=""/>
                </>
              )}
            </div>
          )}
        </>
      );
}

export default SearchResult;