'use strict';

import {enableThemes} from './js/theme';

enableThemes();

import {sendChat} from './socket';

window.sendChat = sendChat;

enableThemes();

test();
