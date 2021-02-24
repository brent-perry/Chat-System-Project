'use strict';

import {sendChat} from './socket';

import {test} from './buttonFunctions/buttons';

window.sendChat = sendChat;

test();
