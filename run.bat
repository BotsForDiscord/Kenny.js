@echo off
title Kenny Beta
cd %~dp0
:start
node bot.js --expose-gc
goto start