const container = document.getElementById('root'); // HTML 요소중 ID가 'root'인 요소 선택하여 상수 container에 저장
const ajax = new XMLHttpRequest();  // XMLHttpRequest 도구를 상수 ajax에 저장 (XMLHttpRequest 메뉴얼은 구글링)
const content = document.createElement('div'); // div 태그를 만듦
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json'; // URL처럼 바뀔 가능성이 있는 데이터는 따로 상수로 빼 주는것이 좋음
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json'; // @id 부분은 후에 replace로 변경시킴 

ajax.open('GET', NEWS_URL, false);    // .open의 method (string, url, async논리값)
ajax.send();    // 데이터를 가져옴 (open만 하면 데이터를 가져오지 않음)

/*
 * ajax.open(-,-,boolean=false): async boolean 값이 false 라 함은 동기적으로 처리하겠다는 말
 * ajax: 비동기적인 웹 앱의 제작을 위한 조합을 이용하는 웹 개발 기법 (HTML+CSS)or(DOM+JavaScript)or(XML,XSLT,XMLHttpRequest)
 * send 된 ajax의 데이터는 ajax.response 에 들어있음

 *** 여기까지 입력 데이터 가져오기 완성! 하단부터는 가져온 데이터를 출력하는 코드 ***
*/

const newsFeed = JSON.parse(ajax.response);
/* 변수 newsFeed에 JSON.parse 저장
 * JSON.parse() : 괄호안의 JSON 데이터 값을 객체화하여 반환
 * 데이터를 Javascript에서 쉽게 다룰수 있는 형태로 바꿈
*/

// (``)백틱 : 문자열을 만드는 방법중 하나
/* 뉴스 타이틀 리스트업 하드코딩 : 표현하고 싶은 갯수만큼 코드를 하나하나 적음
 * document.getElementById('root').innerHTML =
    `<ul>
      <li>${newsFeed[0].title}</li>
      <li>${newsFeed[1].title}</li>
      <li>${newsFeed[2].title}</li>
    </ul>`;
 * tip!  ${} : 백틱으로 표현된 문자열 코드는 HTML에서 문자 그대로를 출력하기 때문에 ${}를 사용하여 변수 안의 데이터를 출력하게함
*/

// 하드코딩의 단점을 보완하기 위해 반복문 (for문) 을 사용하여 리스트업

const ul = document.createElement('ul'); // ul 태그를 만듦

window.addEventListener('hashchange', function() {

  const id = location.hash.substring(1) // location : 주소와 관련된 다양한 정보 제공 , substring 으로 가져온 해쉬 값에서 맨앞글자 '#' 제거
  ajax.open('GET', CONTENT_URL.replace('@id', id), false); // replace() : 문자열 함수. 값을 대체해주는 함수 (CONTENT_URL의 @id 문자열을 변수 id 값으로 대체)
  ajax.send();

  const newsContent = JSON.parse(ajax.response);
  const title = document.createElement('h1'); // h1 태그를 만듦

  title.innerHTML = newsContent.title;

  content.appendChild(title); // content(div) 태그 하위에 title(h1) 태그 추가
  console.log(newsContent);

});
/* hash(#) : 브라우저에서 url의 #과 함께있는 부분식별자. 북마크
 * hashchange : 브라우저에서 hash 값이 바뀔 때 발생하는 이벤트. 브라우저 url이 바뀌는 것이므로 이벤트리스너는 window객체에 등록할수있음.
*/

// for 반복문 : i 시작값 0 , i가 10이 되기 전까지 반복, i는 1씩 증가, { } 안의 코드를 반복함
for(let i = 0; i < 10; i++) {
  const li = document.createElement('li');
  const a = document.createElement('a');

  a.href = `#${newsFeed[i].id}`; // a 태그에 href 속성 추가 <a href =' '>
  a.innerHTML = `${newsFeed[i].title} (${newsFeed[i].comments_count})`; // HTML 화면에 출력 : newsFeed title (comments 갯수)

  ul.appendChild(li); // ul 태그 하위에 li 태그 추가
  li.appendChild(a); // li 하위에 a 태그 추가
}

container.appendChild(ul); // appendChild: 자식추가 ul 태그를 root 하위에 추가
container.appendChild(content); // root 하위에 div 태그 추가

/* 이 코드의 문제점
 * HTML과 비교했을때 가독성이 좋지 않음 => DOM API 제거하기 : 문자열만을 이용해서 UI를 만듦 (DOM API = appendChild, )
 * 중복코드가 많음
*/

