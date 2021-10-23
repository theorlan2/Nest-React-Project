import { FunctionComponent, ReactNode, useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from 'redux'
import dayjs from "dayjs";
import isYesterday from 'dayjs/plugin/isYesterday';
//
import Container from '../components/layout/Container';
import ListElementNew from "../components/news/ListElementNew";
import { IRootState } from "../store/createReducers";
import { initData, removeItem } from "../store/post/actions";
import { PostStatusEnum } from "../infrastructure/enums/post";
import { RequestStatusEnum } from "../infrastructure/enums/generics";


interface StateProps {
  posts?: any;
  postsStatus?: RequestStatusEnum;
}
interface DispatchProps {
  initNewsData: () => void;
  removeNewsItem: (id: string) => void;
}
interface OwnProps {
  children?: ReactNode;
}

type Props = StateProps & DispatchProps & OwnProps;

const NewsView: FunctionComponent<Props> = (props) => {

  useEffect(() => {
    props.initNewsData && props.initNewsData();
  }, [])


  function showDate(time: string): string {
    let result = '';
    dayjs.extend(isYesterday);
    const isAfterToday = dayjs().isAfter(time, 'day');
    const _isYesterday = dayjs(time).isYesterday();

    if (_isYesterday) {
      result = 'Yesterday';
    } else {
      result = dayjs(time).format(isAfterToday ? 'DD MMMM' : 'hh:mm a')
    }
    return result;
  }

  function isValidTitle(str?: string): boolean {
    return str == '' || str == undefined;
  }

  return (
    <main className="main" >
      <div className="cover-news">
        <Container>
          <h2>HN Feed</h2>
          <h3>We {'<3'} Hacker news!</h3>
        </Container>
      </div>
      <Container>
        <div className="cont-list-news">
          {Array.isArray(props.posts) && props.posts.map((item: any, indexItem) => !isValidTitle(item.title) ? <ListElementNew key={indexItem + '-list-element-new'} title={item.title} time={showDate(item.created_at)} author={item.author} id={item._id} url="aa" onRemove={(id: string) => props.removeNewsItem(id)} /> : undefined)}

          {props.postsStatus == RequestStatusEnum.LOADING && <div className="cont-loading" >
            <p>Loading data....</p></div>}

          {props.postsStatus == RequestStatusEnum.LOADING && <div className="cont-loading" >
            <p>There is no data on the server yet....</p></div>}

          {props.postsStatus == RequestStatusEnum.ERROR && <div className="cont-error" >
            <p>An error has occurred on the server....</p></div>}

        </div>
      </Container>

    </main>
  );

}

const mapStateToProps = (state: IRootState) => ({
  posts: state.posts.posts,
  postsStatus: state.posts.postsStatus,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  initNewsData: () => dispatch(initData()),
  removeNewsItem: (id: string) => dispatch(removeItem(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewsView)

