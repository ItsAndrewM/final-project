import { createGlobalStyle } from "styled-components";
import FugazOneRegular from "./fonts/FugazOne-Regular.ttf"
import LoraBold from "./fonts/Lora-Bold.ttf"
import RobotoRegular from "./fonts/Roboto-Regular.ttf"

export default createGlobalStyle`
    @font-face {
        font-family: 'Fugaz One Regular';
        src: url(${FugazOneRegular}) format('truetype');
    }

    @font-face {
        font-family: 'Lora Bold';
        src: url(${LoraBold}) format('truetype');
    }

    @font-face {
        font-family: 'Roboto Regular';
        src: url(${RobotoRegular}) format('truetype');
    }
    :root {
        --primary-color: #FFFFFF;
        --accent-primary-color: #1EBBD7;
        --accent-secondary-color: #70d8eb;
        --page-horizontal-padding: 20px;
        --header-height: 50px;
        --max-content-width: 1200px;
        --heading-font-family: 'Fugaz One Regular';
        --body-font-family: 'Roboto Regular';
        --user-img-width: 120px;
    }


    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        vertical-align: baseline;
        box-sizing: border-box;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    h1, h2, h3 {
        color: var(--primary-color);
        font-family: var(--heading-font-family);
        font-weight: normal;
    }
    p, button {
        color: var(--primary-color);
        font-family: var(--body-font-family);
    }
    h2 {
      font-size: 28px;
    }
`;
