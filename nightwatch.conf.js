const PKG = require('./package.json');
const BINPATH = './bin/';
const SCREENSHOT_PATH = "./reports/screenshots/" + PKG.version + "/";
const serverPath = require('selenium-server-standalone');

const config = {
    src_folders: [
        "tests",
        "retest"
    ],
    output_folder: "./reports",
    custom_commands_path : "./custom-commands/",
    custom_assertions_path : "./assertation/",
    selenium: {
        start_process: true,
        server_path: serverPath,
        log_path: "",
        host: "127.0.0.1",
        port: 4444,
        cli_args: {
            "webdriver.chrome.driver": "bin/chromedriver",
            "webdriver.gecko.driver":"bin/geckodriver"
        }
    },
    test_workers: {"enabled": true, "workers": "1"},
    test_settings: {
        default: {
            launch_url: "https://storefront:SallyCares@development-web-sallybeauty.demandware.net/on/demandware.store/Sites-SA-Site/",
            selenium_port: 4444,
            selenium_host: "localhost",
            silent: true,
            skip_testcases_on_fail:false,
            screenshots: {
                enabled: false,
                path: "./reports/screenshots"
            },
            desiredCapabilities: {
                browserName: "chrome",
                marionette: true,
                acceptSslCerts: true
            },
            globals:require("./data/user"),
        },
        request_timeout_options: {
            timeout: 15000,
            retry_attempts: 5
        },
        chrome: {
            desiredCapabilities: {
                browserName: "chrome",
                acceptSslCerts: true
            }
        },
        firefox: {
            desiredCapabilities: {
                browserName: "firefox",
                acceptSslCerts: true
            }
        },
        edge: {
            desiredCapabilities: {
                browserName: "MicrosoftEdge"
            }
        },
        test_runner: {
            type: "mocha",
            options: {
                ui: "bdd",
                reporter: "list"
            }
        }
    }
};
module.exports = config;