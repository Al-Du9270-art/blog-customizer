import { useEffect, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
interface ArticleParamsFormProps {
	isOpen: boolean;
	onToggle: () => void;
	articleState: ArticleStateType;
	setArticleState: (state: ArticleStateType) => void;
	onApply: () => void;
	onReset: () => void;
}

export const ArticleParamsForm = ({
	isOpen,
	onToggle,
	articleState,
	setArticleState,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) return;

		const handleClick = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				onToggle();
			}
		};

		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, [isOpen, onToggle]);

	return (
		<div ref={containerRef} onClick={(e) => e.stopPropagation()}>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<aside
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						onApply();
					}}
					onReset={(e) => {
						e.preventDefault();
						onReset();
					}}>
					<Text as='h2' size={22} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='шрифт'
						selected={articleState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(newOption) =>
							setArticleState({ ...articleState, fontFamilyOption: newOption })
						}
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						selected={articleState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(newOption) =>
							setArticleState({ ...articleState, fontSizeOption: newOption })
						}
					/>
					<Select
						title='Цвет шрифта'
						selected={articleState.fontColor}
						options={fontColors}
						onChange={(newOption) =>
							setArticleState({ ...articleState, fontColor: newOption })
						}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={articleState.backgroundColor}
						options={backgroundColors}
						onChange={(newOption) =>
							setArticleState({ ...articleState, backgroundColor: newOption })
						}
					/>
					<Select
						title='Ширина Контента'
						selected={articleState.contentWidth}
						options={contentWidthArr}
						onChange={(newOption) =>
							setArticleState({ ...articleState, contentWidth: newOption })
						}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
