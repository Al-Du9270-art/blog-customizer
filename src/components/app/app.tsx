import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [isOpen, onToggle] = useState(false);
	const [articleState, setArticleState] = useState(defaultArticleState);
	const [draftState, setDraftState] = useState(defaultArticleState);
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isOpen}
				onToggle={() => onToggle(!isOpen)}
				articleState={draftState}
				setArticleState={setDraftState}
				onApply={() => setArticleState(draftState)}
				onReset={() => {
					setDraftState(defaultArticleState);
					setArticleState(defaultArticleState);
				}}
			/>
			<Article />
		</main>
	);
};
