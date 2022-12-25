
class FaceTracker {

  constructor(distance = 0.5) {
    this.distance = distance; // Distance camera to face
    this.width = 0;
    this.height = 0;
    this.video = typeof document !== 'undefined' ? document.querySelector('#video') : null;
    this.canvas = typeof document !== 'undefined' ? document.createElement('canvas') : null;
  }

  async init() {
    // Model
    if (window.blazeface) {
      this.model = await window.blazeface.load();
    }

    // Camera
    if (navigator.mediaDevices.getUserMedia) {
      await navigator.mediaDevices
        .getUserMedia({
          video: { facingMode: 'user' },
        })
        .then((stream) => {
          if (this.video && this.canvas) {
            // Add camera stream to video element
            this.video.srcObject = stream;
            this.width = stream.getTracks()[0].getSettings().width || this.width;
            this.height = stream.getTracks()[0].getSettings().height || this.height;
            this.canvas.width = this.width || 0;
            this.canvas.height = this.height || 0;
          }
        })
        .catch(function (error) {
          console.error('Could not access the camera. Error: ' + error.name);
          alert('Could not access the camera. Error: ' + error.name);
        });
    }
  }

  async getFacePosition() {
    if (!this.canvas || !this.video || !this.width || !this.height) {
      return [0, 0];
    }
    let context = this.canvas.getContext('2d');
    if (!context) return [0, 0];
    context.drawImage(this.video, 0, 0, this.width, this.height);
    const result = await this.analyzeImage(context, this.width, this.height);
    if (!result) return [0, 0];
    const [angle1, angle2] = result;
    const tan1 = -Math.tan(angle1);
    const tan2 = -Math.tan(angle2);
    const z = Math.sqrt((this.distance * this.distance) / (1 + tan1 * tan1 + tan2 * tan2));
    const cameraPosition = [z * tan1, z * tan2];
    return cameraPosition;
  }

  async analyzeImage(ctx, width, height) {
    if (!this.model) return [0, 0];
    let predictions;
    const input = ctx.getImageData(0, 0, width, height);
    predictions = await this.model.estimateFaces(input);
    if (!predictions.length) return null;
    const { topLeft, bottomRight } = predictions[0];
    const [topLeftX, topLeftY] = topLeft;
    const [bottomRightX, bottomRightY] = bottomRight;
    const centerX = (topLeftX + bottomRightX) / 2;
    const centerY = (topLeftY + bottomRightY) / 2;
    const [hFov, vFov] = this.fov(width, height);
    return [Math.atan(((2 * (centerX - width / 2)) / width) * Math.tan(hFov / 2)), Math.atan(((2 * (centerY - height / 2)) / height) * Math.tan(vFov / 2))];
  }

  fov(w, h) {
    const hypothenuse = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2));
    const tan_dfov = Math.tan(Math.PI / 6);
    return [2 * Math.atan((w * tan_dfov) / hypothenuse), 2 * Math.atan((h * tan_dfov) / hypothenuse)];
  }
}

export { FaceTracker };
