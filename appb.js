/* [ 라우터 - 화면처리기 만들기 ]
 * 화면 전환 하기 : 라우터 ( 글목록 화면 / 글내용 화면)
 * 코드 가독성 좋게 문자열로 바꾸기
 * 타이틀 눌렀을 때 화면에 타이틀이 자꾸 추가되는 버그 개선해보기
 *  => appendchild 추가만 있는 상태라 그렇다
 *  => appendchild 코드를 다른코드로 개선해보자
*/

const container = document.getElementById('root');
const ajax = new XMLHttpRequest();  
const content = document.createElement('div'); 
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json'; 
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';  


function getData(url) {
  ajax.open('GET', url, false);
  ajax.send();

  return JSON.parse(ajax.response);
}
// 여기까지 수정 없음

//함수 newsFeed를 만들기 위해 최하단에 있던 newsList 배열~끝까지 싹 긁어옴 
function newsFeed() {
  const newsFeed = getData(NEWS_URL)
  // 배열을 사용해서 코드 문자열로 바꾸기
  const newsList = []; // newsList 배열 생성
  newsList.push('<ul>'); // newsList 배열의 첫번쨰 요소[0]에 <ul> 태그를 넣음. 순서[0]를 기억하기 어렵기 떄문에 push 사용. push : 배열의 제일 마지막에 새로 넣음
  for(let i = 0; i < 10; i++) {
    // asis) const div = document.createElement('div'); : div 필요없게됨
    // asis) div.innerHTML = `` => newsList.push(``)
    // for문으로 하단의 단락을 for 조건만큼 반복하고 출력함
      newsList.push(`
      <li>
        <a href="#${newsFeed[i].id}">
        ${newsFeed[i].title} (${newsFeed[i].comments_count})
        </a>
      </li>
    `);
  
    // asis) ul.appendChild(div.firstElementChild); : div x ul x
  }

  // asis) container.appendChild(ul);
  // asis) container.appendChild(content); 
  newsList.push('</ul>');
  container.innerHTML = newsList.join('');
  /* innerHTML에는 배열은 올수 없고 하나의 문자열이 들어가야함 => join : 여러개의 태그들로 이루어진 배열을 하나의 문자열로 합치는 기능
   * join으로 합쳐진 배열은 콤마(,) 로 나눠져 있음
   * join(''); 입력시 배열이 콤마 구분자로 나뉘지 않고 공백으로 나뉨
  */

}
// asis) const newsFeed = getData(NEWS_URL); => function newsFeed() 구문 안 첫째줄로 이동 : 데이터를 가져오는 조건문
// asis) const ul = document.createElement('ul'); x

function newsDetail() {
  const id = location.hash.substring(1);
  const newsContent = getData(CONTENT_URL.replace('@id', id)); 
    
  container.innerHTML = `
    <h1>${newsContent.title}</h1>
 
    <div>
      <a href="#">목록으로</a>
    </div>
  `;
}


// 하단의 기존코드에서 이름없는 익명 함수로 사용했기에 이름으로 call 할수 없어서 function만 따로 빼주고 함수 이름을 붙여줌

/*window.addEventListener('hashchange', function() {
 *const id = location.hash.substring(1);
  
  const newsContent = getData(CONTENT_URL.replace('@id', id)); 
  // asis) const title = document.createElement('h1');  => <h1></h1>

  container.innerHTML = `
    <h1>${newsContent.title}</h1>

    <div>
      <a href="#">목록으로</a>
    </div>
  `;

  // asis) title.innerHTML = newsContent.title; => <h1>${newsContent.title}</h1>

  // asis) content.appendChild(title); => x

});
*/

// 시작하자마자 newsFeed 게시글 한개를 보여줌 // 단지 화면을 전환하는 목적이기 때문에 특정 화면의 어떠한 데이터에 대해서는 관심 없음
function router() {
  const routePath = location.hash;
  
  // 목록을 표시할지 내용을 표시할지 판단하는 조건문
  if (routePath === '') { // routePath === '' 목록 표시 : 실제로 목록은 # 이지만 뒤에 아무것도 없이 # 만 있으면 공백으로 인식함
    newsFeed();
  } else {
    newsDetail();
  }
}

window.addEventListener('hashchange', router); // 라우터가 해시가 바뀔때마다 동작하게 됨

router();