export const createSchool = `INSERT INTO schoolprofile(school_id,school_name,schoolLogo,schoolEmail,schoolPhone,schoolWebsite,
province,district, sector, RegisteredDate)
    VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9,$10) returning *`;

export const updateShool = `UPDATE schoolprofile
	SET school_name=$1,schoolEmail=$2, schoolPhone=$3, schoolWebsite=$4,province=$5,district=$6,sector=$7
    WHERE school_id =$8 returning *`;
export const avoidDuplicate = `select * from schoolprofile where schoolEmail=$1 or school_name=$2 or schoolPhone=$3 or schoolWebsite=$4`;
export const getById = `select * from schoolprofile where schoolEmail=$1`;
export const getByEmail = `select * from schoolprofile where schoolEmail=$1`;