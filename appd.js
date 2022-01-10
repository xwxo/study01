// [복잡한 ui구현을 위한 사전 준비작업 : 템플릿]
// 코드와 ui 를 분리시켜서 복잡도를 줄임

const container = document.getElementById('root');
const ajax = new XMLHttpRequest();
const content = document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';
const store = {
  currentPage: 1,
};

function getData(url) {
  ajax.open('GET', url, false);
  ajax.send();

  return JSON.parse(ajax.response);
}

function newsFeed() {
  const newsFeed = getData(NEWS_URL);
  const newsList = [];
  //템플릿 생성
  let template = `
   <div class="container mx-auto p-4">
    <h1>Hacker News</h1>
    <ul>
      {{__news_feed__}}
    </ul>
    <div>
      <a href="#/page/{{__prev_page__}}">이전 페이지</a>
      <a href="#/page/{{__next_page__}}">다음 페이지</a>
    </div>
   </div>
  `;
  /* <ul> 태그 안에 <li> 대신 {{__news_feed__}} : 마킹 생성
   * <a href="#/page/{{__prev_page__}}"> 
  */
  
  // asis) newsList.push('<ul>'); : 템플릿에 <ul> 태그가 다 있기에 필요없어짐
  
  for(let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    newsList.push(`
      <li>
        <a href="#/show/${newsFeed[i].id}">
          ${newsFeed[i].title} (${newsFeed[i].comments_count})
        </a>
      </li>
    `);
  }
  
  // asis ) newsList.push('</ul>'); //

  /* asis ) 템플릿에 포함되어 삭제
   *newsList.push(`
    <div>
      <a href="#/page/${store.currentPage > 1 ? store.currentPage - 1 : 1}">이전 페이지</a>
      <a href="#/page/${store.currentPage + 1}">다음 페이지</a>
    </div>
  `);
  */


  template = template.replace('{{__news_feed__}}', newsList.join(''));
  //template 안에 {{newsfeed}} 이부분이 for문으로 만들어진 newsList 데이터 배열로 대체됨
  template = template.replace('{{__prev_page__}}', store.currentPage > 1 ? store.currentPage - 1 : 1);
  //template 안에 {{prevpage}} 부분을 이전페이지로 가는 3단구문으로 대체. (현재페이지)가 1보다 큰가? true일때 (현재페이지)-1 / false일때 1페이지로 -> 0페이지로 가지 않기위한 방어코드임
  template = template.replace('{{__next_page__}}', store.currentPage + 1);
  //template 안에 {{nextpage}} 부분을 다음페이지로 가는 코드로 대체
  container.innerHTML = template;
  //asis) container.innerHTML = newsList.join('');
}

function newsDetail() {
  const id = location.hash.substring(7);
  const newsContent = getData(CONTENT_URL.replace('@id', id))

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
    newsDetail()
  }
}

window.addEventListener('hashchange', router);

router();


//그다지 좋은 코드는 아님. for문도 있고 마킹마다 replace 해줘야함
//Handlebars 툴을 사용해 template 레이아웃을 바꿔보는 작업 나중에 해보면 좋음