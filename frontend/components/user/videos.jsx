import React from 'react';

class Videos extends React.Component {
  constructor(props) {
    super(props);
    const lock = { name: 'lock' };
    lock.ref = React.createRef();
    lock.url = "https://d2ue93q3u507c2.cloudfront.net/assets/signup/" +
               "images/application/first_experience/" +
               "FirstExperienceLockMovie.mp4";
    const money = { name: 'money' };
    money.ref = React.createRef();
    money.url = "https://d2ue93q3u507c2.cloudfront.net/assets/signup/" +
                "images/application/first_experience/" +
                "FirstExperienceMoneyMovie.mp4";
    const stopwatch = { name: 'stopwatch' };
    stopwatch.ref = React.createRef();
    stopwatch.url = "https://d2ue93q3u507c2.cloudfront.net/assets/" +
                    "signup/images/application/first_experience/" +
                    "FirstExperienceStopwatchMovie.mp4";
    this.videos = [lock, money, stopwatch];
    this.state = { currentVideo: 0 };
  }

  nextState() {
    setTimeout(() =>
      this.setState(
        { currentVideo: (this.state.currentVideo + 1) % 3 },
        () => {
          this.videos[this.state.currentVideo].ref.current.currentTime = 0;
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
    return (
      <div>
        {
          this.videos.map((video, i) =>
            <video key={video.name} ref={video.ref} playsInline autoPlay muted className={this.state.currentVideo == i ? "" : "hide"}>
              <source src={video.url} type="video/mp4" />
              Stopwatch animation
            </video>
          )
        }
      </div>
    );
  }
}

export default Videos;
