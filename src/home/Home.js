import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import connect from '../util/connect';
import { fetchTopRated as fetchTopRatedAction } from './ducks';
import TopRated from './topRated';
import Search from './search';

class Home extends PureComponent {
  componentWillMount() {
    this.props.fetchTopRated();
  }

  onViewGameDetailClick = (gameId) => {
    this.props.history.push(`/games/${gameId}`);
  }

  renderLoadingComponent() {
    return this.props.isLoading ? <div>Loading Top Rated Games&hellip;</div> : null;
  }

  render() {
    const { topRated } = this.props;

    return (
      <div className="home">
        {this.renderLoadingComponent()}

        <Search />

        <TopRated
          topRated={topRated}
          onViewGameDetailClick={this.onViewGameDetailClick}
        />

      </div>
    );
  }
}

Home.propTypes = {
  isLoading: PropTypes.bool,
  topRated: PropTypes.arrayOf(PropTypes.object),
  fetchTopRated: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

Home.defaultProps = {
  isLoading: false,
  topRated: [],
};

const mapStateToProps = state => ({ topRated: state.homePage.topRated });
const mapDispatchToProps = dispatch => ({ fetchTopRated: () => dispatch(fetchTopRatedAction()) });

export default connect(mapStateToProps, mapDispatchToProps, Home);
