import "./Footer.css";

function Footer() {

    return (
        <div className="footer">
            <h1>Software Engineering Project</h1>
            <a href="https://github.com/dT0210/SoftwareEngineeringProject" target="_blank">
                <img 
                    width="80px"
                    height="80px"
                    src="https://assets.dryicons.com/uploads/icon/svg/8310/70d584e3-4eb3-4ed1-8df8-944e9b123089.svg"
                    alt=""
                    />
            </a>
            <div className="credits">
                <p>Credits:</p>
                <p>Nguyen Duc Thanh</p>
                <p>Nguyen Huy Trung</p>
                <p>Nguyen Thi Mai</p>
                <p>Vu Thi Nga</p>
            </div>
        </div>
    );
};

export default Footer;