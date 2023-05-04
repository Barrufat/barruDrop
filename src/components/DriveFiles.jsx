// eslint-disable-next-line
/* global gapi */
/*global google*/
/* exported gapiLoaded */
/* exported gisLoaded */
/* exported handleAuthClick */
/* exported handleSignoutClick */

import React, { useEffect, useState } from 'react';
import './driveFiles.css'
import DropFiles from './DropFiles';
import { SiGoogle, SiGooglecloud } from "react-icons/si";


// 835955756099-hfetq5v6inbo6dc3ifj9iaig2834l74c.apps.googleusercontent.com  client ID
// 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  cliente Secret
// AIzaSyCqgbZU0-1hPgNjSmw4qGWqvxvMo8p1PyE API Key

const DriveFiles = () => {

    const [fileList, setFileList] = useState([]);
    const [toggle, setToggle] = useState(true);
    const [authClass, setAuthClass] = useState('closed');
    const [outClass, setOutClass] = useState('closed');

    // TODO(developer): Set to client ID and API key from the Developer Console
    const CLIENT_ID = '835955756099-hfetq5v6inbo6dc3ifj9iaig2834l74c.apps.googleusercontent.com';
    const API_KEY = 'AIzaSyCqgbZU0-1hPgNjSmw4qGWqvxvMo8p1PyE';

    // Discovery doc URL for APIs used by the quickstart
    const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

    let tokenClient;
    let gapiInited = false;
    let gisInited = false;

    // document.getElementById('authorize_button').style.visibility = 'hidden';
    // document.getElementById('signout_button').style.visibility = 'hidden';

    /**
     * Callback after api.js is loaded.
     */
    function gapiLoaded() {
        gapi.load('client', initializeGapiClient);
    }

    /**
     * Callback after the API client is loaded. Loads the
     * discovery doc to initialize the API.
     */
    async function initializeGapiClient() {
        await gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: [DISCOVERY_DOC],
        });
        gapiInited = true;
        maybeEnableButtons();
    }

    /**
     * Callback after Google Identity Services are loaded.
     */
    function gisLoaded() {
        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: '', // defined later
        });
        gisInited = true;
        maybeEnableButtons();
    }

    useEffect(() => {
        gapiLoaded();
        gisLoaded();
    }, [gapiLoaded, gisLoaded])


    /**
     * Enables user interaction after all libraries are loaded.
     */
    function maybeEnableButtons() {
        if (gapiInited && gisInited && toggle) {
            setAuthClass('driveButton');
            setToggle(false);
        }
    }

    /**
     *  Sign in the user upon button click.
     */
    function handleAuthClick() {

        tokenClient.callback = async (resp) => {
            if (resp.error !== undefined) {
                throw (resp);
            } else {
                setAuthClass('closed');
                setOutClass('driveButton');
            }
            // document.getElementById('signout_button').style.visibility = 'visible';
            // document.getElementById('authorize_button').innerText = 'Refresh';

            // await listFiles();
        };

        if (gapi.client.getToken() === null) {
            // Prompt the user to select a Google Account and ask for consent to share their data
            // when establishing a new session.
            tokenClient.requestAccessToken({ prompt: 'consent' });
        } else {
            // Skip display of account chooser and consent dialog for an existing session.
            tokenClient.requestAccessToken({ prompt: '' });
        }
    }

    /**
     *  Sign out the user upon button click.
     */
    function handleSignoutClick() {
        setAuthClass('driveButton');
        setOutClass('closed');

        const token = gapi.client.getToken();
        if (token !== null) {
            google.accounts.oauth2.revoke(token.access_token);
            gapi.client.setToken('');
            // document.getElementById('content').innerText = '';
            // document.getElementById('authorize_button').innerText = 'Authorize';
            // document.getElementById('signout_button').style.visibility = 'hidden';
        }
    }

    /**
     * Print metadata for first 10 files.
     */
    // async function listFiles() {
    //     let response;
    //     try {
    //         response = await gapi.client.drive.files.list({
    //             'pageSize': 10,
    //             'fields': 'files(id, name)',
    //         });
    //     } catch (err) {
    //         document.getElementById('content').innerText = err.message;
    //         return;
    //     }
    //     const files = response.result.files;
    //     if (!files || files.length == 0) {
    //         document.getElementById('content').innerText = 'No files found.';
    //         return;
    //     }
    //     // Flatten to string to display
    //     const output = files.reduce(
    //         (str, file) => `${str}${file.name} (${file.id})\n`,
    //         'Files:\n');
    //     document.getElementById('content').innerText = output;
    // }

    function upload(files) {
        setFileList(files);
        console.log('Drive: ', files);
    }

    return (
        <>
            <DropFiles sendFiles={upload} />
            <div className='driveCont'>
                <div className='titleCont'>
                <h1 className='driveTitle'> Bienvenido</h1>
                <h1 className='driveTitle'> a </h1>
                <h1 className='driveTitle'> BarruDrop</h1>
            </div>
            <h2 className='driveText'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto exercitationem, modi ratione except</h2>
            <button className={authClass} onClick={() => handleAuthClick()}><SiGoogle /> Login con Google</button>
            <button className={outClass} onClick={() => handleSignoutClick()}>Logout</button>
        </div>
        </>
    )
}

export default DriveFiles