import React from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { mockCompletedEvaluations } from '../../../data/mockJudgeData';

const JudgeCompletedEvaluations = () => {
    return (
        <DashboardLayout role="judge" title="Completed Evaluations" subtitle="History of your evaluations.">
            <div className="card">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f8f9fa', textAlign: 'left' }}>
                            <th style={{ padding: '1rem' }}>Project</th>
                            <th style={{ padding: '1rem' }}>Team</th>
                            <th style={{ padding: '1rem' }}>Score</th>
                            <th style={{ padding: '1rem' }}>Date</th>
                            <th style={{ padding: '1rem' }}>Feedback Excerpt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockCompletedEvaluations.map(evalItem => (
                            <tr key={evalItem.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '1rem' }}>{evalItem.projectName}</td>
                                <td style={{ padding: '1rem' }}>{evalItem.teamName}</td>
                                <td style={{ padding: '1rem', fontWeight: 'bold' }}>{evalItem.score}/40</td>
                                <td style={{ padding: '1rem' }}>{new Date(evalItem.completedAt).toLocaleDateString()}</td>
                                <td style={{ padding: '1rem', color: '#666', fontStyle: 'italic' }}>
                                    "{evalItem.feedback.substring(0, 50)}..."
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
};

export default JudgeCompletedEvaluations;
