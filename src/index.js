import "./css/styles.scss";
import "./assets/images/logo.svg";
import "./assets/images/favicon-32x32.png";
import loadData from "./lib/loadData";
import resizeHandler from "./lib/resizeHandler";

loadData("/data.json").catch((err) => {
    console.error(err);
});

resizeHandler();
