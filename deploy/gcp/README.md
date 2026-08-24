# Google Cloud Run 배포

프론트엔드는 정적 파일로 빌드한 뒤 Nginx 컨테이너로 Cloud Run에 배포한다.
요청 기반 과금, 최소 인스턴스 0, 최대 인스턴스 2로 구성한다.

## 빌드

```powershell
gcloud builds submit `
  --project=gg-tournament-prod-2465 `
  --region=asia-northeast3 `
  --config=deploy/gcp/cloudbuild.yaml .
```

## 배포

```powershell
gcloud run deploy gg-tournament-front `
  --project=gg-tournament-prod-2465 `
  --region=asia-northeast3 `
  --image=asia-northeast3-docker.pkg.dev/gg-tournament-prod-2465/gg-tournament/frontend:latest `
  --allow-unauthenticated `
  --port=8080 `
  --memory=256Mi `
  --cpu=1 `
  --concurrency=80 `
  --min-instances=0 `
  --max-instances=2
```

Cloud Run URL이 생성되면 백엔드의 `CORS_ALLOWED_ORIGINS`에 해당 URL을 추가하고
백엔드 앱 컨테이너를 다시 생성한다.

## GitHub Actions 자동 배포

`main` 브랜치에 변경이 반영되면 `.github/workflows/deploy-production.yml`이 다음 작업을 수행한다.

1. npm 의존성 설치, 린트, 운영 빌드
2. GitHub 러너에서 Nginx 이미지를 빌드해 Artifact Registry에 업로드
3. 최소 인스턴스 0, 최대 인스턴스 2 설정으로 Cloud Run 배포
4. 공개 헬스 체크

인증은 `github-actions/gg-tournament-front` Workload Identity Provider와
`github-frontend-deploy` 서비스 계정을 사용한다. 서비스 계정 키는 저장하지 않는다.
실패 내역은 GitHub 저장소의 Actions 탭에서 확인한다.
