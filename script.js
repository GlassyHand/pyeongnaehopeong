function showStory(storyNumber) {
    // 메인 페이지 숨기기
    document.getElementById('mainPage').classList.add('hidden');
    
    // 모든 스토리 페이지 숨기기
    const storyPages = document.querySelectorAll('.story-page');
    storyPages.forEach(page => {
        page.classList.remove('active');
    });
    
    // 선택한 스토리 페이지 보이기
    const pageId = 'storyPage' + storyNumber + '-1';
    const pageElement = document.getElementById(pageId);
    if (pageElement) {
        pageElement.classList.add('active');
    } else {
        // 스토리 2, 3처럼 하위 페이지가 없는 경우
        document.getElementById('storyPage' + storyNumber).classList.add('active');
    }
}

function nextPage(pageId) {
    // 메인 페이지로 돌아가는 경우
    if (pageId === 'mainPage') {
        // 모든 스토리 페이지 숨기기
        const storyPages = document.querySelectorAll('.story-page');
        storyPages.forEach(page => {
            page.classList.remove('active');
        });
        
        // 메인 페이지 보이기
        const mainPage = document.getElementById('mainPage');
        if (mainPage) {
            mainPage.classList.remove('hidden');
            window.scrollTo(0, 0);
        }
        return;
    }
    
    // 스토리 페이지로 이동하는 경우
    // 1. 현재 활성화된 페이지를 비활성화 (숨기기)
    const activePage = document.querySelector('.story-page.active');
    if (activePage) {
        activePage.classList.remove('active');
    }

    // 2. 새로운 페이지를 활성화 (보이기)
    const targetPage = document.getElementById(pageId);
    
    if (targetPage) {
        // 메인 페이지 숨기기
        const mainPage = document.getElementById('mainPage');
        if (mainPage) {
            mainPage.classList.add('hidden');
        }
        
        targetPage.classList.add('active');
        // 스크롤을 맨 위로
        window.scrollTo(0, 0);
    } else {
        // 페이지 ID를 찾지 못했을 때: 흰 화면의 원인일 수 있습니다.
        console.error('페이지를 찾을 수 없습니다:', pageId);
        alert('오류! 다음 페이지를 찾을 수 없습니다: ' + pageId);
        // 오류가 나면 현재 페이지가 다시 보이도록 처리하여 흰 화면 방지
        if (activePage) {
            activePage.classList.add('active');
        }
    }
}

function showHint(storyNumber, hintNumber) {
    const hints = {
        1: {
            1: "특정 기호를 더하거나 빼니 비슷하지만 다른 영단어가 되는군. 그렇다면 기호들이 의미하는 것은...",
            2: "흐음, live를 거꾸로 하면 evil이 되는군...",
            3: "잠깐, 혹시 '어디에 붙는지'도 중요한건가?"
        },

        2: {
            1: "저 모서리가 둥근 네모 안에 들어가는 숫자가 답이 될 거야.",
            2: "흠, 이건 아이디어랄 게 딱히 없군. 부등호를 잘 비교해가며, 마치 스도쿠를 푸는 것 처럼 하나하나 풀어나가면 되는 일이겠어.",
        },
        3: {
            1: "다섯글자의 영단어가 답이라면, 어쩌면 랜턴 위에 써져 있는 숫자가 스펠링일 수도 있겠군.",
            2: "묶여진 선의 개수가 중요해 보이는데... 각각 1개, 2개, 3개이니 말이야.",
            3: "...잠깐, 1과 2, 그리고 3을 영어로 하면...?"
        },
        4: {
            1: "글자가 거꾸로 써져 있는 것은 다 이유가 있을 거야.",
            2: "위의 문양과 밑의 글자의 색은 일치하는군. 그러면 서로 대응하는 부분이 있을까?",
            3: "아하, 이대로 차례대로 위와 아래를 비교한다면... 답은 4글자로 된 영단어가 되겠구나."
        },
        5: {
            1: "표 밑에 무성히 자란 덤불들의 색을 잘 볼 필요가 있겠어. 초록, 회색, 주황, 보라...",
            2: "초록색은 노란색과 파란색이 조합된 색이었던가.",
            3: "표에서 마주하는 색과 색을 섞어본다면 덤불과 대응하는 4글자의 알파벳을 찾을 수 있겠어...!"
        },
        6: {
            1: "각 인형은 숫자와 일대일 대응이 되고 있구나. 이 인형을 쪽지의 기준에 맞게 일렬로 세워본다면 6개의 숫자가 나오겠지.",
            2: "화길옹주와 궁녀 사이에 2명 이상 있지 않아야 한다는 건, 붙어 있어도 상관은 없다는 소리겠지.",
            3: "가장 확실한 조합부터 만들어 놓고 하나하나 붙여보는 방식이 확실하겠구나. 부마와 화길옹주를 먼저 붙여두고 나머지 조건들을 하나하나 해결해보자. "
        },
        7: {
            1: "의미 없어 보이는 문양의 배열이지만, 어쩐지 문자같아 보이기도 하고... ",
            2: "잠시만, 노마! 고개를 한 번 기울여보겠니?",
        },
        8: {
            1: "룩은 상하좌우 직선으로만 움직일 수 있지. 그리고 보아하니, 저 흑색의 킹을 잡아야 하는 모양이야.",
            2: "밑의 그림은... 룩이 다른 기물을 만나면 좌우로 꺾어야 한다는 의미일까?",
            3: "룩에서부터 시작하지 말고, 킹에서부터 시작해보는 것도 나쁘지 않은 발상이겠어."
        },
        9: {
            1: "모빌은 총 6줄... 답은 6글자의 단어라는 소리일까.",
            2: "창문 틀의 모양이 어쩐지 디지털 시계를 연상시키는 구조구나. 여러 가지 선의 조합으로 글자를 만들어내는...",
            3: "같은 색의 모빌의 줄에 달린 원반과 창문 틀의 위치를 하나하나 대응시키다보면, 영어 스펠링이 나오는구나!"
        },
        10: {
            1: "그러고 보니 저울이 전부 기울지 않고 평형을 이루고 있구나.",
            2: "저울이 평형을 이루고 있다는 것은, 같은 막대기에 매달린 것끼리는 무게가 같다는 의미이겠지..",
            3: "그렇다면, 가장 안쪽에 있는 저울부터 해결해나가면 쉬울 것 같구나."
        }
    };

    if (hints[storyNumber] && hints[storyNumber][hintNumber]) {
        alert(hints[storyNumber][hintNumber]);
    } else {
        alert('힌트가 준비되지 않았습니다.');
    }
}

// ... (showStory, nextPage, showHint 함수는 이전과 동일) ...

function checkAnswer(pageId) {
    // 페이지별 input ID와 정답 매핑
    const pageConfig = {
        'storyPage1-2': {
            inputId: 'answer1-2',
            correctAnswer: 'hut',
            nextPage: 'storyPage1-3'
        },
        'storyPage1-3': {
            inputId: 'answer1-3',
            correctAnswer: '41',
            nextPage: 'storyPage1-4' 
        },
        'storyPage1-5': {
            inputId: 'answer1-5',
            correctAnswer: 'enter',
            nextPage: 'storyPage1-6'
        },
        'storyPage2-1': {
            inputId: 'answer2-1',
            correctAnswer: ['life'], 
            nextPage: 'storyPage2-2' 
        },
        'storyPage2-2': {
            inputId: 'answer2-2',
            correctAnswer: ['bomb'],
            nextPage: 'storyPage2-3' 
        },
        'storyPage2-3': { 
            inputId: 'answer2-3',
            correctAnswer: '431652', 
            nextPage: 'storyPage2-4'
        },
        'storyPage3-1': {
            inputId: 'answer3-1',
            correctAnswer: ['behind the two cars'],
            nextPage: 'storyPage3-2'
        },
        'storyPage3-2': {
            inputId: 'answer3-2',
            correctAnswer: ['explosions'],
            nextPage: 'storyPage3-3'
        },
        'storyPage3-3': {
            inputId: 'answer3-3',
            correctAnswer: ['faucet'],
            nextPage: 'storyPage3-4'
        },
        'storyPage3-5': {
            inputId: 'answer3-5',
            correctAnswer: ['green'],
            nextPage: 'storyPage3-6'
    }}
    
    const config = pageConfig[pageId];
    if (!config) {
        alert('페이지 설정을 찾을 수 없습니다.');
        return;
    }
    
    // ... (이하 checkAnswer 로직은 이전과 동일) ...
    const answerInput = document.getElementById(config.inputId);
    if (!answerInput) {
        alert('답변 입력란을 찾을 수 없습니다.');
        return;
    }
    
    const answer = answerInput.value.trim();
    
    if (!answer) {
        alert('정답을 입력해주세요.');
        return;
    }
    
    // 정답 비교 로직
    let isCorrect = false;
    const correctAnswer = config.correctAnswer;
    
    // 정답이 배열인 경우 (복수 정답)
    if (Array.isArray(correctAnswer)) {
        isCorrect = correctAnswer.some(correct => {
            // 대소문자 구분 없이 비교
            return answer.toLowerCase() === correct.toLowerCase();
        });
    }
    // 정답이 단일 값인 경우
    else {
        // 숫자 또는 대소문자 구분 없이 비교
        if (answer.toLowerCase() === correctAnswer.toLowerCase() || 
            ( !isNaN(answer) && !isNaN(correctAnswer) && Number(answer) === Number(correctAnswer) )
        ) {
            isCorrect = true;
        }
    }
    
    if (isCorrect) {
        nextPage(config.nextPage);
    } else {
        alert('틀렸습니다. 다시 시도해주세요.');
    }
}

// ... (Enter 키로 제출 로직도 이전과 동일) ...

// Enter 키로 제출
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const activePage = document.querySelector('.story-page.active');
        if (activePage) {
            const pageId = activePage.id;
            // answer input이 있는 페이지인지 확인
            if (pageId === 'storyPage1-2' || pageId === 'storyPage1-3') {
                checkAnswer(pageId);
            }
        }
    }
});