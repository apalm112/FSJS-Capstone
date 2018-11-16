import Typography from 'typography';
// import bootstrapTheme from 'typography-theme-bootstrap';
// import lawtonTheme from 'typography-theme-lawton';
// import fairyGateTheme from 'typography-theme-fairy-gates';
import kirkhamTheme from 'typography-theme-kirkham'


// const typography = new Typography({ baseFontSize: '18px' });
// const typography = new Typography(bootstrapTheme);
const typography = new Typography(kirkhamTheme)


export default typography
export const rhythm = typography.rhythm


//	Then set this module to be used by gatsby-plugin-typography as its config in your gatsby-config.js file.
