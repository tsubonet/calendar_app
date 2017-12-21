import { connect } from 'react-redux'
import { fetchData } from '../actions/records'
import Router from '../components/router'

const mapStateToProps = (state) => {
  return {...state}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchData: (event) => {
      dispatch(fetchData(event.currentTarget.getAttribute('href')))
    },
  }
}

const RouterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Router)

export default RouterContainer;
