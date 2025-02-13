/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	RichText,
	useBlockProps,
	__experimentalElementButtonClassName,
} from '@wordpress/block-editor';
import { __, sprintf } from '@wordpress/i18n';

export default function save( { attributes } ) {
	const {
		href,
		fileId,
		fileName,
		textLinkHref,
		textLinkTarget,
		showDownloadButton,
		downloadButtonText,
		displayPreview,
		previewHeight,
	} = attributes;

	const pdfEmbedLabel = RichText.isEmpty( fileName )
		? __( 'PDF embed' )
		: sprintf(
				/* translators: %s: filename. */
				__( 'Embed of %s.' ),
				fileName
		  );

	const hasFilename = ! RichText.isEmpty( fileName );

	// Only output an `aria-describedby` when the element it's referring to is
	// actually rendered.
	const describedById = hasFilename ? fileId : undefined;

	return (
		href && (
			<div { ...useBlockProps.save() }>
				{ displayPreview && (
					<>
						<object
							className="wp-block-file__embed"
							data={ href }
							type="application/pdf"
							style={ {
								width: '100%',
								height: `${ previewHeight }px`,
							} }
							aria-label={ pdfEmbedLabel }
						/>
					</>
				) }
				{ hasFilename && (
					<a
						id={ describedById }
						href={ textLinkHref }
						target={ textLinkTarget }
						rel={
							textLinkTarget ? 'noreferrer noopener' : undefined
						}
					>
						<RichText.Content value={ fileName } />
					</a>
				) }
				{ showDownloadButton && (
					<a
						href={ href }
						className={ classnames(
							'wp-block-file__button',
							__experimentalElementButtonClassName
						) }
						download={ true }
						aria-describedby={ describedById }
					>
						<RichText.Content value={ downloadButtonText } />
					</a>
				) }
			</div>
		)
	);
}
