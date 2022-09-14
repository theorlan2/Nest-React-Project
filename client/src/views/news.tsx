import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from 'redux'

import { useMutation, useQuery } from "@tanstack/react-query";
//
import Container from '../components/layout/Container';
import ListElementNew from "../components/news/ListElementNew";
import { IRootState } from "../store/createReducers";
import { initData, removeItem } from "../store/post/actions";
import { deletePost, getPost } from '../infrastructure/repositories/news.repository';
import { formatDateIsYesterday } from "../infrastructure/utils/dateUtils";

interface StateProps {
  posts?: any;
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
  const [idPost, setIdPost] = useState("");
  const { data, isLoading, isError } = useQuery(['news'], getPost);
  const { isLoading: isDeletingPost, mutate: deleteThePost } = useMutation(
    () => deletePost(idPost),
    {
      onSuccess: (res) => {
        setIdPost("");
        console.log('onSuccess')
        
      },
      onError: (err) => {
        setIdPost("");
        console.log('onError')

      },
    }
  );


  useEffect(() => {
    if (idPost != "") {
      deleteThePost();
    }
  }, [idPost]);

  function isValidTitle(str?: string): boolean {
    return str === '' || str === undefined;
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
          {Array.isArray(data?.data)
            && data?.data.map((item: any, indexItem) => !isValidTitle(item.title)
              && <ListElementNew key={indexItem + '-list-element-new'} title={item.title} time={formatDateIsYesterday(item.created_at)} author={item.author} id={item._id} url="aa" onRemove={(id: string) => { setIdPost(id); }} />)}

          {isLoading && <div className="cont-loading" >
            <p>Loading data....</p></div>}

          {Array.isArray(data?.data)
            && !data?.data.length && <div className="cont-loading" >
              <p>There is no data on the server yet....</p>
            </div>}

          {isError && <div className="cont-error" >
            <p>An error has occurred on the server....</p></div>}

        </div>
      </Container>

    </main>
  );

}

const mapStateToProps = (state: IRootState) => ({
  posts: state.posts.posts,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  initNewsData: () => dispatch(initData()),
  removeNewsItem: (id: string) => dispatch(removeItem(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewsView)

