import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {changeThePage} from '../actions';

function Pagination() {

  const props = useSelector(
    state => ({
      pageCount: state.pageCount,
      currentPage: state.currentPage,
      pageNumbers2Display: state.pageNumbers2Display
    })
  );
  const dispatch = useDispatch();

  //Handle next and previous buttons
  const changePage = (event) => {
    //since useeffects() runs this twice, we need to cancel the second running of ths function
    //a weird thing happens which I haven't figured it out yet. But it's a TODO job to make this better
    if(event.currentTarget === undefined) return;

    event.preventDefault();
    const { currentPage, pageCount, pageNumbers2Display } = props;
    let newPage = 1;
    let extraPages2Jump = 3;
    let page2JumpFrom;
    switch (event.currentTarget.id){
      case 'p-page'://previous
        newPage = currentPage > 1 ? currentPage - 1 : 1;
      break;
      case 'n-page'://next
        newPage = currentPage < pageCount ? currentPage + 1 : pageCount;
      break;
      case 'f-page'://first
        newPage = 1;
      break;
      case 'l-page'://last
        newPage = pageCount;
      break;
      case 'e-dots'://last dots
        page2JumpFrom = currentPage <= pageNumbers2Display ? pageNumbers2Display : currentPage + 2;
        newPage = page2JumpFrom + extraPages2Jump <= pageCount ? page2JumpFrom + extraPages2Jump : currentPage;
      break;
      case 's-dots': //first dots
        page2JumpFrom = currentPage >= pageCount - (pageNumbers2Display - 1) ? pageCount - (pageNumbers2Display - 1) :  currentPage - 2;
        newPage = page2JumpFrom - 3 >= 1 ? page2JumpFrom - 3 : 1;
      break;
      default: // page numbers
        newPage = Number(event.currentTarget.id); //using event.target would reference to child tag (a). So use event.currentTarget
    }

    dispatch(changeThePage(newPage));
  }

  const prevPage = () => {
      return (
        <li key="p-page" id="p-page" onClick={changePage}>
          <a href="/#">&lt;</a>
        </li>
      )
  }

  const nextPage = () => {
    return (
      <li key="n-page" id="n-page" onClick={changePage}>
        <a href="/#">&gt;</a>
      </li>
    )
  }

  const { currentPage, pageCount, pageNumbers2Display } = props;
  //for pages less than twice as mush as pageNumbers2Display, display all the page numbers,
  //cause its pointless to show extra buttons in this case scenarios
  const shouldDisplayExtraButtons = pageCount - pageNumbers2Display >= pageNumbers2Display;
  function getPageNumberList() {
    const list = [];
    if(shouldDisplayExtraButtons) {
      let i = currentPage <= pageNumbers2Display ? 1 :
            currentPage + pageNumbers2Display > pageCount ? pageCount - (pageNumbers2Display - 1) :
              currentPage - (Math.floor(pageNumbers2Display / 2));
      let toNumber = i + pageNumbers2Display;
      for (i; i < toNumber; i++) {
        list.push(i);
      }
    }
    else {
      for (let i = 1; i <= Math.ceil(pageCount); i++) {
        list.push(i);
      }
    }
    return list;
  }

  const RenderPageNumbers = () => {
    return (
      getPageNumberList().map(number => {
       return (
         <li className={currentPage === number ? 'active' : ''} key={number} id={number} onClick={changePage}>
           <a href="/#">{number}</a>
         </li>
       );
     })
    );
  }

  const FirstPage = () => {
    if((currentPage > pageNumbers2Display) && shouldDisplayExtraButtons) {
      return (
        <li className = {currentPage === 1 ? ' active' : ''} key="f-page" id="f-page" onClick ={changePage} >
          <a href="/#">1</a>
        </li>
      )
		}
		else
			return null;
  }

  const LastPage = () => {
			if((currentPage < pageCount - (pageNumbers2Display - 1)) && shouldDisplayExtraButtons) {
        return (
          <li className = {currentPage === pageCount ? ' active' : ''} key="l-page" id="l-page" onClick ={changePage} >
            <a href="/#">{pageCount}</a>
          </li>
        )
			}
			else
				return null;
	}

  const StartDots = () => {
    if((currentPage > pageNumbers2Display) && shouldDisplayExtraButtons) {
      return (
        <li key="sdots" id="s-dots" onClick ={changePage} >
          <a href="/#">...</a>
        </li>
      )
    }
    else
      return null;
  }

  const EndDots = () => {
    if((currentPage < pageCount - (pageNumbers2Display - 1)) && shouldDisplayExtraButtons) {
      return (
        <li key="edots" id="e-dots" onClick ={changePage} >
          <a href="/#">...</a>
        </li>
      )
    }
    else
      return null;
  }

  if(pageCount > 1) {
    return (
      <div className="row">
        <ul className="pagination">
          {prevPage()}
          <FirstPage />
          <StartDots />
          <RenderPageNumbers />
          <EndDots />
          <LastPage />
          {nextPage()}
        </ul>
      </div>
    );
  }
  else
    return null;
}

export default Pagination;
