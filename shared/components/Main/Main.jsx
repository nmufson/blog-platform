import PropTypes from 'prop-types';

const Main = ({ children }) => <main>{children}</main>;

Main.propTypes = {
  children: PropTypes.node.isRequired, // React nodes to be rendered
};

export default Main;
