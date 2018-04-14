import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTopRated as fetchTopRatedAction } from './ducks';
import TopRated from './topRated';
import Search from './search';

class Home extends PureComponent {
  componentWillMount() {
    this.props.fetchTopRated();
  }

  renderLoadingComponent() {
    return this.props.isLoading ? <div>Loading Top Rated Games&hellip;</div> : null;
  }

  render() {
    return (
      <div>
        {this.renderLoadingComponent()}
        <TopRated topRated={this.props.topRated} />
        <Search />
      </div>
    );
  }
}

Home.propTypes = {
  isLoading: PropTypes.bool,
  topRated: PropTypes.arrayOf(PropTypes.object),
  fetchTopRated: PropTypes.func.isRequired,
};

Home.defaultProps = {
  isLoading: false,
  topRated: [],
};

const mapStateToProps = state => ({ topRated: state.homePage.topRated });
const mapDispatchToProps = dispatch => ({ fetchTopRated: () => dispatch(fetchTopRatedAction()) });

export default connect(mapStateToProps, mapDispatchToProps)(Home);
