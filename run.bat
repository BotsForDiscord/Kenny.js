@echo off
title Kenny
cd %~dp0
:start
node bot.js --expose-gc
goto start