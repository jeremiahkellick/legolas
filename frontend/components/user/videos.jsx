import React from 'react';

class Videos extends React.Component {
  constructor(props) {
    super(props);
    const lock = { name: 'lock' };
    lock.ref = React.createRef();
    lock.url = "https://d2ue93q3u507c2.cloudfront.net/assets/signup/" +
               "images/application/first_experience/" +
               "FirstExperienceLockMovie.mp4";
    lock.title = (
      <span>Free stock trading.<br />Stop paying up to $10 per trade.</span>
    );
    lock.text = (
      <span>
        We’ve cut the fat that makes other brokerages costly, like manual
        account management and hundreds of storefront locations, so we can offer
        zero commission trading.
      </span>
    );
    const money = { name: 'money' };
    money.ref = React.createRef();
    money.url = "https://d2ue93q3u507c2.cloudfront.net/assets/signup/" +
                "images/application/first_experience/" +
                "FirstExperienceMoneyMovie.mp4";
     money.title = (
       <span>Account Protection</span>
     );
     money.text = (
       <span>
         Member of SIPC. Securities in your account are protected up to
         $500,000. For details, please see www.sipc.org.
       </span>
     );
    const stopwatch = { name: 'stopwatch' };
    stopwatch.ref = React.createRef();
    stopwatch.url = "https://d2ue93q3u507c2.cloudfront.net/assets/" +
                    "signup/images/application/first_experience/" +
                    "FirstExperienceStopwatchMovie.mp4";
    stopwatch.title = (
      <span>Stay on top of your portfolio.<br /> Anytime. Anywhere.</span>
    );
    stopwatch.text = (
      <span>
        Fast execution, real-time market data, and smart notifications help
        you make the most of the stock market no matter where you are.
      </span>
    );
    this.videos = [lock, money, stopwatch];
    this.state = { currentVideo: 0 };
  }

  nextState() {
    setTimeout(() =>
      this.setState(
        { currentVideo: (this.state.currentVideo + 1) % 3 },
        () => {
          this.videos[this.state.currentVideo].ref.current.currentTime = 0;
          this.videos[this.state.currentVideo].ref.current.play();
          this.nextState();
        }
      ),
      5000
    );
  }

  componentDidMount() {
    this.nextState();
  }

  render () {
    const currentVideo = this.state.currentVideo;
    return (
      <section className="sign-up-sidebar">
        {
          this.videos.map((video, i) =>
            <div
              key={video.name}
              className={this.state.currentVideo === i ? "" : "hide"}>

              <video ref={video.ref} playsInline autoPlay muted>
                <source src={video.url} type="video/mp4" />
                Stopwatch animation
              </video>
              <p className="slide-title">
                {video.title}
              </p>
              <p className="slide-text">
                {video.text}
              </p>
            </div>
          )
        }
      </section>
    );
  }
}

export default Videos;
