# Vite 빌드에 필요한 Node.js 이미지 사용
FROM node:20.17.0-alpine AS build

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 파일 복사 및 의존성 설치
COPY package.json yarn.lock ./
RUN yarn install

# 소스 코드 복사 및 빌드
COPY . .
RUN yarn build

# 정적 파일을 제공하는 단계
FROM node:20.17.0-alpine AS serve

# npx serve를 사용하여 빌드된 파일을 제공
WORKDIR /app
COPY --from=build /app/dist ./dist

# npx serve로 빌드된 Vite 파일 제공 (포트를 5173으로 변경)
CMD ["npx", "serve", "-s", "dist", "-l", "5173"]

# 포트 노출
EXPOSE 5173
