# output/

게시글(주제)마다 **폴더 하나**. 입력 없이 결과만 모입니다.

```
output/
└── dessert-next/      ← 주제 슬러그
    ├── 01.html ~ NN.html   (소스. 문구 수정 후 재캡처용 — 지우지 마세요)
    └── 01.png ~ NN.png     (인스타에 올리는 최종 이미지)
```

- `_sample/`은 파이프라인 검증용 테스트 카드입니다. 지워도 됩니다.
- 재캡처: 카드 HTML을 고친 뒤 `node scripts/capture.mjs output/<폴더>`
