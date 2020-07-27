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

import { h, Component } from 'preact';
import { connect } from 'preact-redux';

class MeasureLog extends Component {
	componentWillReceiveProps(props, oldProps) {
		if (!oldProps.editor && props.editor) {
			props.editor.event.message.add((msg) => {
				if (msg.info) {
					this.base.innerHTML = msg.info;
					this.base.classList.add('visible');
				} else {
					this.base.classList.remove('visible');
				}
			});
		}
	}
	render() {
		return (
			<div className="measure-log" />
		);
	}
}
export default connect(
	state => ({
		editor: state.editor
	})
)(MeasureLog);
