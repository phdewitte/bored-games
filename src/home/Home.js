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

  render() {
    const { topRated, isLoading } = this.props;

    return (
      <div className="home">
        <Search />
        <TopRated
          isLoading={isLoading}
          topRated={topRated}
          onViewGameDetailClick={this.onViewGameDetailClick}
        />
      </div>
    );
  }
}

Home.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  topRated: PropTypes.arrayOf(PropTypes.object),
  fetchTopRated: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

Home.defaultProps = {
  topRated: [],
};

const mapStateToProps = state => ({
  isLoading: state.homePage.isLoading,
  topRated: state.homePage.topRated,
});
const mapDispatchToProps = dispatch => ({ fetchTopRated: () => dispatch(fetchTopRatedAction()) });

export default connect(mapStateToProps, mapDispatchToProps, Home);
