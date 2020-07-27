/**
 * Copyright 2020 Open Reaction Database Project Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as structFormat from '../data/convert/structformat';

export function onAction(action) {
	if (action && action.dialog) {
		return {
			type: 'MODAL_OPEN',
			data: { name: action.dialog }
		};
	}
	if (action && action.thunk)
		return action.thunk;

	return {
		type: 'ACTION',
		action
	};
}

export function load(structStr, options) {
	return (dispatch, getState) => {
		const state = getState();
		const editor = state.editor;
		const server = state.server;

		options = options || {};
		// TODO: check if structStr is parsed already
		// utils.loading('show');
		const parsed = structFormat.fromString(structStr, options, server);

		return parsed.then((struct) => {
			// utils.loading('hide');
			console.assert(struct, 'No molecule to update');
			if (options.rescale)
				struct.rescale(); // TODO: move out parsing?

			if (struct.isBlank()) return;
			if (options.fragment)
				dispatch(onAction({ tool: 'paste', opts: struct }));
			else
				editor.struct(struct);
		}, (err) => {
			alert(err.message || 'Can\'t parse molecule!'); // eslint-disable-line no-undef
			// TODO: notification
		});
	};
}
