import logo from './logo.svg';
import './App.css';
import AWS from "aws-sdk"

function App() {
  AWS.config.update({
    region: "ap-northeast-2",
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-2:6ee23d75-4e72-4315-a378-5548b22d70fc",
    }),
  })

  const handleFileInput = e => {
    const file = e.target.files[0]
  
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "yalu-s3",
        Key: file.name,
        Body: file,
      },
    })
  
    const promise = upload.promise()
  
    promise.then(
      function (data) {
        alert("이미지 업로드에 성공했습니다.")
      },
      function (err) {
        return alert("오류가 발생했습니다: ", err.message)
      }
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <input type="file" id="upload" className="image-upload" onChange = {handleFileInput}/>
        <label htmlFor="upload" className="image-upload-wrapper">S3 Upload</label>
      </header>
    </div>
  );
}

export default App;
