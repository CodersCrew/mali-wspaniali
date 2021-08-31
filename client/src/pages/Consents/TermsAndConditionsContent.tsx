import { Box, Link, Typography } from '@material-ui/core';
import { Trans, useTranslation } from 'react-i18next';

import { DownloadIcon } from '../../components/Icons/DownloadIcon';

export const TermsAndConditionsContent = () => {
    const {
        t,
        i18n: { language },
    } = useTranslation();

    return (
        <>
            <Box style={{ wordWrap: 'break-word' }}>
                <Typography variant="h3" align="center">
                    <Trans i18nKey="terms-and-conditions.heading" />
                </Typography>
                {language === 'en' && (
                    <Typography variant="h3" align="center">
                        <Trans i18nKey="terms-and-conditions.sub-heading" />
                    </Typography>
                )}
                <Box mb="1rem" />
                <Typography variant="subtitle1" align="center">
                    <strong>§1</strong>
                </Typography>
                <Typography variant="subtitle1" align="center">
                    <Trans i18nKey="terms-and-conditions.§1.topic" />
                </Typography>
                <Box mb="1rem" />
                <Typography variant="subtitle1">
                    <Trans i18nKey="terms-and-conditions.§1.definition-1" />
                </Typography>
                <Box mb="1rem" />
                <Typography variant="subtitle1">
                    <Trans i18nKey="terms-and-conditions.§1.definition-2" />
                </Typography>
                <Box mb="1rem" />
                <Typography variant="subtitle1">
                    <Trans i18nKey="terms-and-conditions.§1.definition-3" />
                </Typography>
                <Box mb="1rem" />
                <Typography variant="subtitle1">
                    <Trans i18nKey="terms-and-conditions.§1.definition-4" />
                </Typography>
                <Box mb="1rem" />
                <Typography variant="subtitle1">
                    <Trans i18nKey="terms-and-conditions.§1.definition-5" />
                </Typography>
                <Box mb="1rem" />
                <Typography variant="subtitle1">
                    <Trans i18nKey="terms-and-conditions.§1.definition-6" />
                </Typography>
                <Box mb="1rem" />
                <Typography variant="subtitle1">
                    <Trans i18nKey="terms-and-conditions.§1.definition-7" />
                </Typography>
                <Box mb="1rem" />
                <Typography variant="subtitle1">
                    <Trans i18nKey="terms-and-conditions.§1.definition-8" />
                </Typography>
                <Box mb="1rem" />
                <Typography variant="subtitle1">
                    <Trans i18nKey="terms-and-conditions.§1.definition-9" />
                </Typography>
                <Box mb="1rem" />

                <Typography variant="subtitle1" align="center">
                    <strong>§2</strong>
                </Typography>
                <Typography variant="subtitle1" align="center">
                    <Trans i18nKey="terms-and-conditions.§2.topic" />
                </Typography>
                <Typography variant="subtitle1">
                    <ol>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§2.content-1" />
                        </li>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§2.content-2" />
                        </li>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§2.content-3" />
                        </li>
                    </ol>
                </Typography>
                <Box mb="1rem" />

                <Typography variant="subtitle1" align="center">
                    <strong>§3</strong>
                </Typography>
                <Typography variant="subtitle1" align="center">
                    <Trans i18nKey="terms-and-conditions.§3.topic" />
                </Typography>
                <Typography variant="subtitle1">
                    <ol>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§3.content-1" />
                        </li>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§3.content-2" />
                        </li>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§3.content-3" />
                        </li>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§3.content-4" />
                            <ol type="a">
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§3.content-4a" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§3.content-4b" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§3.content-4c" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§3.content-4d" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§3.content-4e" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§3.content-4f" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§3.content-4g" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§3.content-4h" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§3.content-4i" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§3.content-4j" />
                                </li>
                            </ol>
                        </li>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§3.content-5" />
                        </li>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§3.content-6" />
                            <ol type="a">
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§3.content-6a" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§3.content-6b" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§3.content-6c" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§3.content-6d" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§3.content-6e" />
                                </li>
                            </ol>
                        </li>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§3.content-7" />
                        </li>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§3.content-8" />
                            <ol type="a">
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§3.content-8a" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§3.content-8b" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§3.content-8c" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§3.content-8d" />
                                </li>
                            </ol>
                        </li>
                    </ol>
                </Typography>
                <Box mb="1rem" />

                <Typography variant="subtitle1" align="center">
                    <strong>§4</strong>
                </Typography>
                <Typography variant="subtitle1" align="center">
                    <Trans i18nKey="terms-and-conditions.§4.topic" />
                </Typography>
                <Typography variant="subtitle1">
                    <ol>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§4.content-1" />
                            <ol type="a">
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§4.content-1a" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§4.content-1b" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§4.content-1c" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§4.content-1d" />
                                </li>
                            </ol>
                        </li>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§4.content-2" />
                        </li>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§4.content-3" />
                            <ol type="a">
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§4.content-3a" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§4.content-3b" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§4.content-3c" />
                                </li>
                            </ol>
                        </li>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§4.content-4" />
                        </li>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§4.content-5" />
                            <ol type="a">
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§4.content-5a" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§4.content-5b" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§4.content-5c" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§4.content-5d" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§4.content-5e" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§4.content-5f" />
                                </li>
                            </ol>
                        </li>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§4.content-6" />
                            <ol type="a">
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§4.content-6a" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§4.content-6b" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§4.content-6c" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§4.content-6d" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§4.content-6e" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§4.content-6f" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§4.content-6g" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§4.content-6h" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§4.content-6i" />
                                </li>
                            </ol>
                        </li>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§4.content-7" />
                            <ol type="a">
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§4.content-7a" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§4.content-7b" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§4.content-7c" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§4.content-7d" />
                                </li>
                            </ol>
                        </li>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§4.content-8" />
                        </li>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§4.content-9" />
                        </li>
                    </ol>
                </Typography>

                <Typography variant="subtitle1" align="center">
                    <strong>§5</strong>
                </Typography>
                <Typography variant="subtitle1" align="center">
                    <Trans i18nKey="terms-and-conditions.§5.topic" />
                </Typography>
                <Typography variant="subtitle1">
                    <ol>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§5.content-1" />
                        </li>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§5.content-2" />
                        </li>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§5.content-3" />
                        </li>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§5.content-4" />
                            <ol type="a">
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§5.content-4a" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§5.content-4b" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§5.content-4c" />
                                </li>
                            </ol>
                        </li>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§5.content-5" />
                        </li>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§5.content-6" />
                        </li>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§5.content-7" />
                            <ol type="a">
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§5.content-7a" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§5.content-7b" />
                                </li>
                            </ol>
                        </li>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§5.content-8" />
                            <ol type="a">
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§5.content-8a" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§5.content-8b" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§5.content-8c" />
                                </li>
                            </ol>
                        </li>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§5.content-9" />
                            <ol type="a">
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§5.content-9a" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§5.content-9b" />
                                </li>
                                <li>
                                    <Trans i18nKey="terms-and-conditions.§5.content-9c" />
                                </li>
                            </ol>
                        </li>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§5.content-10" />
                        </li>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§5.content-11" />
                        </li>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§5.content-12" />
                        </li>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§5.content-13" />
                        </li>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§5.content-14" />
                        </li>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§5.content-15" />
                        </li>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§5.content-16" />
                        </li>
                    </ol>
                </Typography>

                <Typography variant="subtitle1" align="center">
                    <strong>§6</strong>
                </Typography>
                <Typography variant="subtitle1" align="center">
                    <Trans i18nKey="terms-and-conditions.§6.topic" />
                </Typography>
                <Typography variant="subtitle1">
                    <ol>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§6.content-1" />
                        </li>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§6.content-2" />
                        </li>
                        <li>
                            <Trans i18nKey="terms-and-conditions.§6.content-3" />
                        </li>
                    </ol>
                </Typography>
                <Box mb="2rem" />

                <Typography variant="subtitle1" align="center">
                    <Trans i18nKey="terms-and-conditions.appendix.topic" />
                </Typography>
                <Box mb="1rem" />
                <Link
                    underline="always"
                    color="textPrimary"
                    href={t('registration-page.agreements.resignation-link')}
                    target="_blank"
                >
                    <Box display="flex" flexDirection="row">
                        <DownloadIcon />
                        <Box mr={2} />
                        <Typography variant="subtitle1">
                            {t('registration-page.agreements.resignation-label')}
                        </Typography>
                    </Box>
                </Link>
            </Box>
        </>
    );
};
