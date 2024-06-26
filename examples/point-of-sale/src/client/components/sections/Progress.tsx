import interpolate from 'color-interpolate';
import React, { FC, useMemo } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { PaymentStatus, usePayment } from '../../hooks/usePayment';
import css from './Progress.module.css';
import Image from 'next/image';

export const Progress: FC = () => {
    const { status, progress, reward, rewardLoading } = usePayment();
    const [value, text] = useMemo(() => {
        switch (status) {
            case PaymentStatus.Finalized:
                return [1, 'Complete'];
            case PaymentStatus.Confirmed:
            case PaymentStatus.Valid:
                return progress >= 1 ? [1, 'Complete'] : [progress, Math.floor(progress * 100) + '%'];
            default:
                return [0, status];
        }
    }, [status, progress]);

    const interpolated = useMemo(() => interpolate(['#8752f3', '#5497d5', '#43b4ca', '#28e0b9', '#19fb9b']), []);
    const styles = useMemo(
        () =>
            buildStyles({
                pathTransitionDuration: 0.5,
                pathColor: interpolated(value),
                trailColor: 'rgba(0,0,0,.1)',
            }),
        [interpolated, value]
    );

    return (
        <>
            <div className={css.root}>
                <CircularProgressbar maxValue={1} value={value} styles={styles} />
                <div className={css.text}>{text}</div>
            </div>

            {rewardLoading && (
                <div className={css.modal}>
                    <div className={!reward ? css.modalContent : `${css.modalContent} ${css.show}`}>
                        {reward && (
                            <>
                                <h2>You Won...</h2>
                                <Image src={reward.image} alt={reward.name} width={200} height={200} />
                                <h3>{reward.name}</h3>
                                <p>{reward.description}</p>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
