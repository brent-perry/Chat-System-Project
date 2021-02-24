'use strict';

import {enableThemes} from './js/theme';

enableThemes();

import {sendChat} from './socket';

import {test} from './buttonFunctions/buttons';

window.sendChat = sendChat;

enableThemes();

test();
