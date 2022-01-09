/* [페이징 구현하기]
 * 목록 10개 제한 풀기
 * 방어코드 작성
*/

const container = document.getElementById('root');
const ajax = new XMLHttpRequest();  
const content = document.createElement('div'); 
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json'; 
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';  
const store = {
  currentPage: 1, // 최근 페이지 초기값 1
}; // 단순히 currentPage 라는 변수로 만들 수도 있겠지만 여러 함수에 걸쳐서 접근하게 되는 정보중 공유되는 자원을 하나로 묶어놓으면 코드가 보기 좋은 상태가 됨

function getData(url) {
  ajax.open('GET', url, false);
  ajax.send();

  return JSON.parse(ajax.response);
}

function newsFeed() {
  const newsFeed = getData(NEWS_URL)
  const newsList = []; 
  
  newsList.push('<ul>'); 
  
  for(let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    
      newsList.push(`
      <li>
        <a href="#/show/${newsFeed[i].id}">
        ${newsFeed[i].title} (${newsFeed[i].comments_count})
        </a>
      </li>
    `);
  
    
  }
   
  newsList.push('</ul>');
  newsList.push(`
    <div>
      <a href="#/page/${store.currentPage > 1 ? store.currentPage - 1 : 1}">이전 페이지</a>
      <a href="#/page/${store.currentPage + 1}">다음 페이지</a>
    </div>
  `); 
  /* 1페이지에서 이전페이지 눌렀을때 0페이지로 가지는 버그 방어코드
   * 3항 연산자 store.currentPage > 1 ? store.currentPage -1 : 1 => store.currentPage 이 1보다 크면 (true면) -1 아니면(false) store.currentPage=1 유지
  */
  container.innerHTML = newsList.join('');
  
}


function newsDetail() {
  const id = location.hash.substring(7);
  const newsContent = getData(CONTENT_URL.replace('@id', id)); 
    
  container.innerHTML = `
    <h1>${newsContent.title}</h1>
 
    <div>
      <a href="#/page/${store.currentPage}">목록으로</a>
    </div>
  `;
}


function router() {
  const routePath = location.hash;
  
  if (routePath === '') { 
    newsFeed();
  } else if (routePath.indexOf('#/page/') >= 0) {
    store.currentPage = Number(routePath.substring(7));
    newsFeed();
  } else {
    newsDetail();
  }
}

window.addEventListener('hashchange', router); 

router();