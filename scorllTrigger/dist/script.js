/*
 * @Author: pft tao.pan@backgardon.com
 * @Date: 2025-03-14 06:32:32
 * @LastEditors: pft tao.pan@backgardon.com
 * @LastEditTime: 2025-03-14 15:32:08
 * @FilePath: \study\scorllTrigger\dist\script.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
console.clear();

const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

canvas.width = 1158;
canvas.height = 770;

const frameCount = 147;
const currentFrame = index => (
  `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(index + 1).toString().padStart(4, '0')}.jpg`
);

const images = []
const airpods = {
  frame: 0
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

// 使用GSAP库创建一个动画，将airpods对象的frame属性从当前值过渡到frameCount - 1
gsap.to(airpods, {
  // 动画目标值，即airpods对象的frame属性最终会达到frameCount - 1
  frame: frameCount - 1,
  // 确保动画过程中airpods.frame的值始终是整数
  snap: "frame",
  // 使用线性缓动，动画速度恒定
  ease: "none",
  // 配置ScrollTrigger插件，将动画与滚动事件关联
  scrollTrigger: {
    // 滚动时动画有0.5秒的延迟，使动画更平滑
    scrub: 0.5
  },
  // 动画更新时调用render函数，更新画布上的图像
  onUpdate: render // use animation onUpdate instead of scrollTrigger's onUpdate
});

images[0].onload = render;

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[airpods.frame], 0, 0); 
}