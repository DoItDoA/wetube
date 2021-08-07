import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg"; // 미디어 파일을 포캣해주는 도구
const actionBtn = document.getElementById("actionBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const files = {
  input: "recording.webm",
  output: "output.mp4",
  thumbnail: "thumbnail.jpg",
};

const downloadFile = (fileUrl, fileName) => {
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = fileName; // html a 에 다운로드 기능 추가 , "다운로드 파일명.확장자"
  document.body.appendChild(a); // html a 추가
  a.click(); // html a를 클릭한 것처럼 실행
};

const handleDownload = async () => {
  actionBtn.removeEventListener("click", handleDownload);

  actionBtn.innerText = "Transcoding...";
  actionBtn.disabled = true;

  const ffmpeg = createFFmpeg({
    log: true,
  }); // FFmpeg생성, log:true 기록을 콘솔에서 확인

  await ffmpeg.load(); // FFmpeg 불러오기, 내가 만든 웹사이트에서 다른 소프트웨어를 쓰기때문에 await 사용
  ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile)); //FFmpeg의 가상의 세계에 파일을 생성, 파일의 포맷, url경로로 파일 전송

  await ffmpeg.run("-i", files.input, "-r", "60", files.output); // 가상의 세계에 이미 존재하는 파일을 input(-i)으로 받는다, recording.webm -> output.mp4 , "-r","60" :frame rate 초당 60프레임 인코딩
  await ffmpeg.run(
    "-i",
    files.input,
    "-ss",
    "00:00:00",
    "-frames:v",
    "1",
    files.thumbnail
  ); // -ss는 영상의 특정 시간대로 갈수 있게 함 -> 1초(1초이상 녹화안할 시 오류), -frames:v 해당 프레임의 스크린샷 ->1프레임

  const mp4File = ffmpeg.FS("readFile", files.output); // 파일시스템에서 생성된 파일을 읽는다, readFile의 ruturn 값은 Uint8Array(UnsignedInt8Array)
  const thumbFile = ffmpeg.FS("readFile", files.thumbnail);
  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });
  // 바이너리 데이터로 이뤄진 mp4File을 buffer로 바꿈, Buffer클래스는 바이너리 데이터들의 스트림을 직접 다루기 위해 데이터들을 묶는 역할
  // 바이너리 형태로 큰 객체를 저장할 것이라는 것을 추측할 수 있습니다. 여기서 이 큰 객체라는 것은 주로 이미지, 비디오, 사운드 등과 같은 멀티미디어 객체들을 주로 가리킵니다
  // option은 video 파일 확장자 mp4

  const mp4Url = URL.createObjectURL(mp4Blob);
  const thumbUrl = URL.createObjectURL(thumbBlob);

  downloadFile(mp4Url, "myRecording.mp4");
  downloadFile(thumbUrl, "myThumbnail.jpg");

  ffmpeg.FS("unlink", files.input); // 해당 파일 연결 끊어 속도 상승
  ffmpeg.FS("unlink", files.output);
  ffmpeg.FS("unlink", files.thumbnail);

  URL.revokeObjectURL(mp4Url); // url 제거
  URL.revokeObjectURL(thumbUrl);
  URL.revokeObjectURL(videoFile);

  actionBtn.innerText = "Record Again";
  actionBtn.disabled = false;
  actionBtn.addEventListener("click", handleStart);
};

const handleStop = () => {
  actionBtn.innerText = "Download Recording";
  actionBtn.removeEventListener("click", handleStop);
  actionBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleStart = () => {
  actionBtn.innerText = "Stop Recording";
  actionBtn.removeEventListener("click", handleStart);
  actionBtn.addEventListener("click", handleStop);

  recorder = new MediaRecorder(stream, { mimeType: "video/webm" }); // 권한 설정값을 넣고 , minmeType은 녹화시 확장자 설정
  // recorder.stop()시 실행
  recorder.ondataavailable = (e) => {
    videoFile = URL.createObjectURL(e.data); // 브라우저에 의해 URL이 만들어지고 브라우저에만 존재 ,blob:포함하여 전체 url 입력시 다운로드시작
    video.srcObject = null; //초기화 (미리보기 제거)
    video.src = videoFile; //video html에 src 추가
    video.loop = true; // video html에 loop 추가
    video.play(); // src가 추가된 video 플레이
  };
  recorder.start();
};

const init = async () => {
  // 미디어 입력 장치 사용 권한을 요청하여 값을 저장
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false, // 소리 없앰
    video: {
      width: 1024,
      height: 576,
    }, // 영상 출력
  });
  video.srcObject = stream; // 카메라나 마이크가 stream을 받아오고, Object형식으로 src에 저장
  video.play(); // 비디오 영상 틀기 (미리보기)
};

init();
actionBtn.addEventListener("click", handleStart);
