/* app.js 의 코드를 수정해보자
 * 가독성 증가시키기 => DOM API 제거하기 : 문자열만을 이용해서 UI를 만듦
 * 중복코드 제거
*/

const container = document.getElementById('root');
const ajax = new XMLHttpRequest();  
const content = document.createElement('div'); 
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json'; 
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';  


// 중복되는 코드를 함수로 묶어서 중복코드를 개선시켜보자
function getData(url) {
  ajax.open('GET', url, false);
  ajax.send();

  return JSON.parse(ajax.response);
}

const newsFeed = getData(NEWS_URL);  // as is) const newsFeed = JSON.parse(ajax.response);
const ul = document.createElement('ul'); 

window.addEventListener('hashchange', function() {
  const id = location.hash.substring(1);
  // ajax.open('GET', CONTENT_URL.replace('@id', id), false);
  // ajax.send();

  const newsContent = getData(CONTENT_URL.replace('@id', id)); // as is ) const newsContent = JSON.parse(ajax.response)
  const title = document.createElement('h1'); 

  title.innerHTML = newsContent.title;

  content.appendChild(title); 

});



for(let i = 0; i < 10; i++) {
  const div = document.createElement('div');
  // const li = document.createElement('li');
  // const a = document.createElement('a');
  div.innerHTML = `
    <li>
      <a href="#${newsFeed[i].id}">
       ${newsFeed[i].title} (${newsFeed[i].comments_count})
      </a>
    </li>
  `;
  
  // ul.appendChild(li);
  // li.appendChild(a);
  ul.appendChild(div.firstElementChild);  // = ul.appendChild(div.childern[0]);

}

container.appendChild(ul); 
container.appendChild(content); 

