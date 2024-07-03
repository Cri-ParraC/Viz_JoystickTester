//=============================================================================
// Viz_JoystickTester.js [MZ] (v1.0.1)
//=============================================================================

/*:
 * @target MZ
 * @plugindesc [MZ] (v1.0.1) Registra en consola la actividad del mando o mandos.
 * @author Vizcacha
 * @url https://github.com/Cri-ParraC/Viz_JoystickTester
 * @help Viz_JoystickTester.js [MZ] (v1.0.1)
 * ----------------------------------------------------------------------------
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

  console.info("Viz_JoystickTester.js [MZ] (v1.0.1)");

  window.Imported ||= {};
  Imported.Viz_JoystickTester = 1.0;

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

  const pressedButtons = new Set();
  const pressedAxes = new Set();

  function handleButtons(buttons, gamepadInfo) {
    buttons.forEach((button, index) => {
      if (button.value > 0) {
        if (!pressedButtons.has(index)) {
          pressedButtons.add(index);
          console.info(`${gamepadInfo} Input: ${gamepadButtons[index]} Code: ${index}`);
        }
      } else {
        pressedButtons.delete(index);
      }
    });
  }

  function handleSticks(axes, gamepadInfo) {
    axes.forEach((axis, index) => {
      const negativeKey = `axis-${index}-negative`;
      const positiveKey = `axis-${index}-positive`;

      if (index === 0 || index === 2) {
        if (axis < - 0.5) {
          if (!pressedAxes.has(negativeKey)) {
            pressedAxes.add(negativeKey);
            console.info(`${gamepadInfo} Input: ${gamepadAxes[index]} ←`);
          }
        }
        else {
          pressedAxes.delete(negativeKey);
        }
        if (axis > 0.5) {
          if (!pressedAxes.has(positiveKey)) {
            pressedAxes.add(positiveKey);
            console.info(`${gamepadInfo} Input: ${gamepadAxes[index]} →`);
          }
        }
        else {
          pressedAxes.delete(positiveKey);
        }
      }

      if (index === 1 || index === 3) {
        if (axis < - 0.5) {
          if (!pressedAxes.has(negativeKey)) {
            pressedAxes.add(negativeKey);
            console.info(`${gamepadInfo} Input: ${gamepadAxes[index]} ↑`);
          }
        }
        else {
          pressedAxes.delete(negativeKey);
        }
        if (axis > 0.5) {
          if (!pressedAxes.has(positiveKey)) {
            pressedAxes.add(positiveKey);
            console.info(`${gamepadInfo} Input: ${gamepadAxes[index]} ↓`);
          }
        } else {
          pressedAxes.delete(positiveKey);
        }
      }
    });
  }

  function startGameLoop(index) {
    const gameLoop = () => {
      const gamepad = navigator.getGamepads()[index];
      if (!gamepad) {
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