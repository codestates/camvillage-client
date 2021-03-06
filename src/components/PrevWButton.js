import React from 'react';
import { useHistory } from "react-router-dom";
import YesNoButton from './YesNoButton'

//수신 요청 미리보기 (썸넬 + 제목 +  버튼 or 내 응답) PrevWButton

function PrevWButton({ image, title, id, confirmation, requestid }) {
  // {
  //   "id": PK,
  //   "userId": my id,
  //   // 물건 올린 사람 id
  //   "title": "title",
  //   "image": "image",
  //   "confirmation": '0', // '0': no response, '1': yes, '2': no
  //   "createdAt": "createdAt",
  //   "updatedAt": "updatedAt"
  // }
  console.log({ image, title, id, confirmation, requestid })
  const history = useHistory();

  function handleClick(event) {
    //redirect to 개별 게시물
    history.push(`/item/${event.target.id}`)
  }

  function handleImageURL(image) {
    if(image) {
      return (<img src={`${process.env.REACT_APP_API_URL}/${image}`}></img>)
    }
  }

  return (
    <div className="prevwbutton-body">
      <div className="preview-img-container">
        {handleImageURL(image)}
      </div>
      <div className="preview-title" id={id} onClick={handleClick}>{title}</div>
      <YesNoButton confirmation={confirmation} requestid={requestid}/>
    </div>
  );
}

export default PrevWButton;