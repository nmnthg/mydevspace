import React from "react";
import { Typography } from "@mui/material";
import "./Profile.css";

const Profile = () => {
    return (
        <div className="profile container_shadow">
            <div className="profile_name">
                <Typography className="name">Sam</Typography>
                <Typography className="title">Developer</Typography>
            </div>

            <figure className="profile_image">
                <img src="https://upload.wikimedia.org/wikipedia/en/5/53/Snoopy_Peanuts.png" alt=""/>
            </figure>

            <div className="profile_information">
                Insert Timeline
                <br/>
                <button>my Button</button>
            </div>
        </div>
    );
}

export default Profile;