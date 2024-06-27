/**
 * @author Dias
 * @date 2024/6/20
 * @description Regular User Dashboard Hero Section Component
 */

import { Image } from 'antd';
import styles from './HeroSection.module.css';

interface UserHeroSectionProps {
  imageURL: string;
}

const UserHeroSection: React.FC<UserHeroSectionProps> = ({ imageURL }) => {

    return (
        <div>
            <Image src={imageURL} className={styles.heroSectionImage}/>
        </div>
    );
}

export default UserHeroSection;
