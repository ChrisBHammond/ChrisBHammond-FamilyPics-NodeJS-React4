import PropTypes from 'prop-types';
const About = ({ title } : any) => {

    return (
        <h1> About Family Pics {title}</h1>
    );
}

About.defaultProps ={
    title: "Testing Default",
}

About.prototype = {
    Title: PropTypes.string,
}
  
export default About;
