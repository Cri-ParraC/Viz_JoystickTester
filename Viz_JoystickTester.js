//=============================================================================
// Viz_JoystickTester.js [MZ] (v1.0.0)
//=============================================================================

/*:
 * @target MZ
 * @plugindesc [MZ] (v1.0.0) Registra en consola la actividad del mando o mandos.
 * @author Vizcacha
 * @version 1.0.0
 * @url https://github.com/Cri-ParraC/Viz_JoystickTester
 * @help Viz_JoystickTester.js [MZ] (v1.0.0)
 * 
 * Plugin para RPG Maker MZ que registra en consola la actividad del mando o 
 * mandos conectados.
 *
 * Está pensado para controles XBOX, que utilizan la API estándar "XInput".
 * 
 * Los controles de XBOX compatibles son:
 * - XBOX 360
 * - XBOX One
 * - XBOX Series X y S
 *
 * Detecta controles de otros fabricantes, pero es posible que el mapeo sea
 * diferente.
 */

(() => {
  "use strict";
  console.info("Viz_JoystickTester.js [MZ] (v1.0.0) activado");

  const gamepadButtons = {
    0: "A",
    1: "B",
    2: "X",
    3: "Y",
    4: "LB",
    5: "RB",
    6: "LT",
    7: "RT",
    8: "View",
    9: "Menu",
    10: "LSB",
    11: "RSB",
    12: "D-PAD ↑",
    13: "D-PAD ↓",
    14: "D-PAD ←",
    15: "D-PAD →",
    16: "Guide"
  };

  const gamepadAxes = {
    0: "LSX",
    1: "LSY",
    2: "RSX",
    3: "RSY",
  };

  function handleButtons(buttons, gamepadInfo) {
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].value > 0) {
        console.info(`${gamepadInfo} Input: ${gamepadButtons[i]} Code: ${i}`);
      }
    }
  }

  function handleSticks(axes, gamepadInfo) {
    for (let i = 0; i < axes.length; i++) {
      if (i === 0 || i === 2) {
        if (axes[i] < - 0.5) {
          console.info(`${gamepadInfo} Input: ${gamepadAxes[i]} ←`);
        } else if (axes[i] > 0.5) {
          console.info(`${gamepadInfo} Input: ${gamepadAxes[i]} →`);
        }
      }
      if (i === 1 || i === 3) {
        if (axes[i] < - 0.5) {
          console.info(`${gamepadInfo} Input: ${gamepadAxes[i]} ↑`);
        } else if (axes[i] > 0.5) {
          console.info(`${gamepadInfo} Input: ${gamepadAxes[i]} ↓`);
        }
      }
    }
  }


  function startGameLoop(index) {
    const gameLoop = () => {
      const gamepad = navigator.getGamepads()[index];
      if (gamepad === null) {
        return;
      }
      const gamepadInfo = `${gamepad.id} Index: ${gamepad.index}`;
      handleButtons(gamepad.buttons, gamepadInfo);
      handleSticks(gamepad.axes, gamepadInfo);

      requestAnimationFrame(gameLoop);
    };
    gameLoop();
  }

  window.addEventListener('gamepadconnected', (event) => {
    const gamepad = event.gamepad;
    console.info(`Conectado: ${gamepad.id} Index: ${gamepad.index}`);
    startGameLoop(gamepad.index);
  });

  window.addEventListener('gamepaddisconnected', (event) => {
    const gamepad = event.gamepad;
    console.info(`Desconectado: ${gamepad.id} Index: ${gamepad.index}`);
  });

})();