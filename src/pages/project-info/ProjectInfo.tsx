import React from 'react';
import './ProjectInfo.scss';

export const ProjectInfo = () => {
    return (
        <div className={'ProjectInfo'}>
            <h1>Project Info</h1>

            <div className="delimiter"/>

            <h2>Description</h2>
            <p>It is a simple blogging platform on which users can create new posts and leave comments on existing ones.
                Developing this platform I focused mostly on security, than on functionality.</p>

            <div className="delimiter"/>

            <h2>Development and used tools</h2>
            <table>
                <tr>
                    <td>Frontend</td>
                    <td>React</td>
                </tr>
                <tr>
                    <td>Backend</td>
                    <td>Flask (Python 3) + SQLalchemy</td>
                </tr>
                <tr>
                    <td>Database</td>
                    <td>Postgres SQL Database (remote, hosted on Heroku)</td>
                </tr>
            </table>

            <div className="delimiter"/>

            <h2>Realized protection means</h2>

            <ol>
                <li>
                    <h3>Modern frameworks and tools</h3>
                </li>
                <p>Some protection means are already realized in modern frameworks. For example, React has
                    protection from scripts injection - injected scripts are inserted as text and therefore not
                    executed. And special libraries for making database queries have protection against SQL
                    Injections.</p>

                <li>
                    <h3>Last versions of software</h3>
                </li>

                <p>Modern versions of all frameworks are used to prevent exploitation of known vulnerabilities of older
                    versions.</p>

                <li>
                    <h3>Configuration of server (including DB server)</h3>
                </li>

                <p>FTP (including anonymous) is disabled on server. Database has strong and regularly changed password
                    and a random username.</p>

                <li>
                    <h3>HTTPS</h3>
                </li>
                <p>SSL certificates are used both on frontend and backend parts of project, providing protection from
                    MitM attacks</p>

                <li>
                    <h3>Token based authentication and authorization</h3>
                </li>
                <p>A modern secure authentication using JWT tokens is realized. Two tokens are used: access and
                    refresh.</p>

                <p>Access token has a short live time (30 minutes) and has an id of a current user. It is stored in
                    local storage and passed as a data i requests where authorization is needed.</p>

                <p>Refresh token has much longer expire time (60 days) and is used to generate a new access token when
                    an old one expires. It is stored as an httpOnly cookie available only in auth module of backend
                    application (path is set to /api/auth).</p>

                <p>Used tokens (both access and refresh) are added to blacklist to prevent reuse of them.</p>

                <p>User-Agent is checked before refreshing an access token, acting as another level of protection from
                    token sniffing and reuse by hackers.</p>

                <p>Secret for signing JWT tokens is random.</p>

            </ol>
        </div>
    )
};
