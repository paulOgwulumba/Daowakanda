import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { BackgroundOverlay } from '../../shared/BackgroundOverlay';
import styles from './index.module.scss';

interface Props {
    isActive:boolean;
    onclick: ()=> any;
}

export function DeleteModal({isActive, onclick}:Props) {

    return (
        <>
            <BackgroundOverlay visible={isActive} onClose={onclick}>
                <div className={styles["card"]}>
                    <div className={styles["heading-section"]}>
                        Are you sure you want to delete this proposal
                    </div>
                    <div className={styles["options"]}>
                        <div className={styles["cancel"]} onClick={onclick}>
                            No, Cancel
                        </div>
                        <div className={styles["delete"]}>
                            Yes, Delete
                        </div>
                    </div>
                </div>
            </BackgroundOverlay>
        </>
    );
}
