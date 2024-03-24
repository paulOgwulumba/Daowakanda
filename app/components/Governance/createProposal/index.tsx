import { title } from 'process';
import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { BackgroundOverlay } from '../../shared/BackgroundOverlay';
import styles from './index.module.scss';

interface Props {
    isActive:boolean;
    onclick: ()=> any;
}

export function CreateProposalModal({isActive, onclick}:Props) {

    return (
        <>
            <BackgroundOverlay visible={isActive} onClose={onclick}>
                <div className={styles["card"]}>
                    <div className={styles["cancel-icon"]}>
                        <IoMdClose className={styles["icon"]} onClick={onclick}/>
                    </div>
                    <div className={styles["heading-section"]}>Create Proposal</div>
                    <div className={styles["form"]}>
                        <div className={styles["form-control"]}>
                            <label>Proposal Title</label>
                            <input type="text"
                                placeholder="Enter Proposal Title..."
                            />
                        </div>
                        <div className={styles["form-control"]}>
                            <label>Proposal Description</label>
                            <textarea name="Proposal Description"
                                placeholder='Say something about the proposal...'
                            >
                            </textarea>
                        </div>
                        <div className={styles["options-block"]}>
                            <div className={styles["name"]}>Options</div>
                            <div className={styles["option"]}>Option 1</div>
                            <div className={styles["option"]}>Option 2</div>
                            <div className={styles["add-option"]}>Add Option</div>
                        </div>
                        <div className={styles["date-section"]}>
                            <div className={styles["date-control"]}>
                                <label>Start Date</label>
                                <input type="date" 
                                />
                            </div>
                            <div className={styles["date-control"]}>
                                <label>End Date</label>
                                <input type="date" 
                                />
                            </div>
                        </div>
                        <div className={styles["claim-section"]}>
                            <input type="checkbox"
                            />
                            <label>Claimable Proposal</label>
                        </div>
                        <div className={styles["submit"]}>Submit Proposal</div>
                    </div>
                </div>
            </BackgroundOverlay>
        </>
    );
}
